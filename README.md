# 一页工作台

这是一个按智能体操作台思路组织的个人网站。左侧切换工作台、项目、笔记和个人资料。工作台的指令面板可以按类别列出内容，也可以按关键词搜索。右侧显示索引数量和本次访问最近四条执行记录。

## 预览和使用

- 在浏览器打开 `index.html`。首次进入工作台时有约 3.8 秒的开场，从黑底标志切到白底校验，再打开深色工作台。
- 可以点「跳过开场」或按 Esc，也可以在导航栏点「重播开场」。开启系统的减少动态效果设置时直接进入网站。项目和笔记的直达链接会跳过开场。
- 试试「查看项目」「浏览笔记」「关于我」或「搜索 GitHub」。按 Ctrl+K 或 Command+K 可聚焦指令框。所有查询均在浏览器内匹配本站内容。
- 此前的帝皇铠甲开场方案保留在「项目」的实验条目中。

## 修改内容

在 `index.html` 更新标题、项目、笔记和个人介绍。可搜索条目使用 `data-kind`、`.record-title` 和 `.record-summary`，可通过 `data-keywords` 补充同义关键词。为每个条目保留一个唯一的 `id`，用于生成直达链接。

布局和配色在 `assets/site.css`，开场样式与阶段在 `assets/intro.css` 和 `assets/intro.js`，导航与搜索逻辑在 `assets/workspace.js`。

## 在 GitHub Pages 上发布

1. 在 GitHub 为个人主页创建仓库，仓库名为 `<你的 GitHub 用户名>.github.io`。若已有同名仓库，先确认现有站点的内容。
2. 将压缩包解压，把 `index.html`、`assets`、`.nojekyll` 和 `README.md` 放到仓库发布分支的根目录。
3. 在仓库的 **Settings → Pages** 选 **Deploy from a branch**，再选择对应分支和 **/(root)**，保存。
4. 部署完成后，访问 `https://<你的 GitHub 用户名>.github.io/`。

[GitHub Pages 官方发布说明](https://docs.github.com/zh/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

## 工作台封面

`assets/console-hero.webp` 是用内置 ImageGen 生成的蓝色玻璃折带图。

> Create an original ultra-wide 3:1 cinematic graphic for the dark banner of a Chinese local agent console website. Object entirely in the right 57% of the composition, left area black navy negative space for separately placed text. A sculptural crumpled metallic-blue origami ribbon, spiralling into a central faceted polyhedral knot like an abstract twisted compass and directional cursor, dramatic deep-blue optical glass edges, small sparse floating cobalt light filaments and silver reflections, black midnight environment, sharp specular lighting, crisp dimensional sculptural form, subtle tiny dust, polished high-end technical editorial product photography. Nebulous thin curls in the outer right. Blue limited palette with bright electric ice-blue edges. Keep left third nearly black, continuous pitch-navy background across image, medium contrast. No text, no typography, no UI, no watermark, no faces, no logos, no figures. Wide horizontal landscape crop with room above and below object.

