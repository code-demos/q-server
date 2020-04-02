/**
 * 通过 post + get 下载文件
 */

const args = require("../libs/args");
const { isAccessible } = require("../libs/util");
const path = require("path");
const fs = require("fs");
const archiver = require("archiver");

let downloadId = 0;
const donwloadMap = {};

module.exports = exports = {
  get: (ctx, next) => {
    let { isDownload, downloadId: localId } = ctx.query;
    if (isDownload !== undefined) {
      const downloadInfo = donwloadMap[localId] || {};
      const { downloadList } = downloadInfo;
      delete donwloadMap[localId];
      if (downloadList && downloadList.length > 0) {
        const [firstFile = {}] = downloadList;
        const isMultiple = downloadList.length > 1;
        if (!isMultiple && !firstFile.isDir) {
          // 只有一个文件并且是非目录，直接下载，不走 zip 压缩
          const fullPath = path.join(args.dir, firstFile.fullPath);
          ctx.set({
            "Content-Disposition": `attachment;filename=${firstFile.basename}`
          });
          return (ctx.body = fs.createReadStream(fullPath));
        } else {
          // 批量下载，适用于目录或者多个文件打包下载
          const archive = appendToArchiver(downloadInfo);
          const baseName = path.basename(firstFile.path);
          const downloadName = isMultiple ? "batch" : baseName;
          ctx.set({
            "Content-Disposition": `attachment;filename=${downloadName}.zip`
          });
          return (ctx.body = archive);
        }
      } else {
        return (ctx.body = { success: true, result: "无需要下载的文件" });
      }
    } else {
      return next();
    }
  },
  /**
   * 由于 URL 有长度限制，如果通过 url 传递下载文件参数，当选中过多元素时，可能会超出 url 上限，因此采用 post + get 的方式
   * 先 post 要下载的文件，生成一个下载 id，前端根据此下载 id 进行下载
   */
  post: ctx => {
    const { downloadList, path } = ctx.request.body;
    const loaclId = downloadId++;
    donwloadMap[loaclId] = { downloadList, path };
    return (ctx.body = { success: true, result: loaclId });
  }
};

function appendToArchiver({ downloadList = [], path: subPath }) {
  const cwd = path.join(args.dir, subPath);
  const archive = archiver("zip");
  downloadList.forEach(({ basename }) => {
    const fullPath = path.join(cwd, basename);
    // 对每个路径进行越权校验
    if (isAccessible(args.dir, fullPath)) {
      const globConf = { cwd, dot: args.hidden };
      archive
        .glob(basename, globConf) // 匹配文件
        .glob(`${basename}/**/*`, globConf); // 匹配目录和内容
    } else {
      throw new Error("访问越权");
    }
  });
  archive.finalize();
  return archive;
}
