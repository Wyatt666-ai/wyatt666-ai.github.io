# 一页工作台

这是一个以微缩 3D 书房为首页的个人网站。电脑、书架和相框分别通往项目、笔记和个人资料。左侧也可以切换这些页面并打开工作台。工作台的指令面板支持按类别列出内容和关键词搜索，并显示最近四条执行记录。

## 预览和使用

- 在浏览器打开 `index.html`。首次进入时有约 3.8 秒的开场，从黑底标志切到白底校验，再打开房间。桌面版的房间会随鼠标轻微改变透视，手机上可以直接点标记。
- 可以点「跳过开场」或按 Esc，也可以在导航栏点「重播开场」。开启系统的减少动态效果设置时直接进入网站。项目和笔记的直达链接会跳过开场。
- 试试「查看项目」「浏览笔记」「关于我」或「搜索 GitHub」。按 Ctrl+K 或 Command+K 可聚焦指令框。所有查询均在浏览器内匹配本站内容。
- 此前的帝皇铠甲开场方案保留在「项目」的实验条目中。

## 修改内容

在 `index.html` 更新标题、项目、笔记和个人介绍。可搜索条目使用 `data-kind`、`.record-title` 和 `.record-summary`，可通过 `data-keywords` 补充同义关键词。为每个条目保留一个唯一的 `id`，用于生成直达链接。

布局和配色在 `assets/site.css`，开场样式与阶段在 `assets/intro.css` 和 `assets/intro.js`，导航与搜索逻辑在 `assets/workspace.js`。

书房场景和热点位置在 `assets/room.css`，指针视差在 `assets/room.js`。点击区域按原图百分比定位，更换场景图时可相应调整。

## 在 GitHub Pages 上发布

1. 在 GitHub 为个人主页创建仓库，仓库名为 `<你的 GitHub 用户名>.github.io`。若已有同名仓库，先确认现有站点的内容。
2. 将压缩包解压，把 `index.html`、`assets`、`.nojekyll` 和 `README.md` 放到仓库发布分支的根目录。
3. 在仓库的 **Settings → Pages** 选 **Deploy from a branch**，再选择对应分支和 **/(root)**，保存。
4. 部署完成后，访问 `https://<你的 GitHub 用户名>.github.io/`。

[GitHub Pages 官方发布说明](https://docs.github.com/zh/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

## 工作台封面

`assets/console-hero.webp` 是用内置 ImageGen 生成的蓝色玻璃折带图。

> Create an original ultra-wide 3:1 cinematic graphic for the dark banner of a Chinese local agent console website. Object entirely in the right 57% of the composition, left area black navy negative space for separately placed text. A sculptural crumpled metallic-blue origami ribbon, spiralling into a central faceted polyhedral knot like an abstract twisted compass and directional cursor, dramatic deep-blue optical glass edges, small sparse floating cobalt light filaments and silver reflections, black midnight environment, sharp specular lighting, crisp dimensional sculptural form, subtle tiny dust, polished high-end technical editorial product photography. Nebulous thin curls in the outer right. Blue limited palette with bright electric ice-blue edges. Keep left third nearly black, continuous pitch-navy background across image, medium contrast. No text, no typography, no UI, no watermark, no faces, no logos, no figures. Wide horizontal landscape crop with room above and below object.

## 书房场景

`assets/study-room.webp` 是用内置 ImageGen 生成的微缩书房插图。

> An original premium architectural 3D render, 4:3 landscape composition, for an interactive personal website. A complete miniature isometric cutaway of a cozy mid-century creative's study at night, seen from an elevated front three-quarter angle, meticulously modeled with clearly dimensional scaled furniture. A tidy walnut desk with a SINGLE visible softly glowing cream desktop computer monitor on the left side of the room, warm shaded task lamp, signed-free objects. A clearly separated tall walnut bookcase filled with a few books stands toward the right back wall, and one small distinct light framed abstract print hangs on the visible back wall ABOVE or to the left of the desk, easy to point at. Behind the desk a window shows dark blue nighttime sky. Quiet moss-green rug and a mid-century chair, one pot plant, cream wood flooring on a beveled plinth, restrained terracotta and deep midnight-navy interiors and amber pools of light. Two back walls, fully open un-walled front for legibility, no ceiling, full room and complete plinth visible, carefully centered with breathing space. Subject is roughly 87% width of image, 84% height, clean silhouette. Studio backdrop flat very dark blue-black #10131b, subtle ground bounce only. High-end miniature architecture rendering, beautifully realistic wood grain, warm analog atmosphere and softly textured materials. No text, no letters, no numbers, no people, no logos, no watermark, no UI, no labels or marker dots.

