import fs from 'fs';
import path from 'path';
import { extract_frontmatter, link_renderer } from '@sveltejs/site-kit/utils/markdown.js';
import marked from 'marked';
import { makeSlugProcessor } from '../../utils/slug';
import { highlight } from '../../utils/highlight';
import { SLUG_PRESERVE_UNICODE } from '../../../config';

const makeSlug = makeSlugProcessor(SLUG_PRESERVE_UNICODE);

export default function get_posts(locale) {
	return fs
		.readdirSync('content/blog')
		.filter(file => file[0] !== '.' && path.extname(file) === '.md')
		.map(file => {

			const match = /^(\d+-\d+-\d+)-(.+)\.md$/.exec(file);
			if (!match) throw new Error(`Invalid filename '${file}'`);

			const [, pubdate, slug] = match;

			// TODO 処理フローはあとで見直す
			let markdown;
			if (locale && locale !== 'en') {
				try {
					markdown = fs.readFileSync(`content/blog/${locale}/${path.basename(file, '.md')}.${locale}.md`, 'utf-8');
				} catch (err) {
					markdown = fs.readFileSync(`content/blog/${file}`, 'utf-8');
				}
			} else {
				markdown = fs.readFileSync(`content/blog/${file}`, 'utf-8');
			}

			const { content, metadata } = extract_frontmatter(markdown);

			const date = new Date(`${pubdate} EDT`); // cheeky hack
			metadata.pubdate = pubdate;
			metadata.dateString = date.toDateString();

			const renderer = new marked.Renderer();

			renderer.link = link_renderer;

			renderer.code = highlight;

			renderer.heading = (text, level, rawtext) => {
				const fragment = makeSlug(rawtext);

				return `
					<h${level}>
						<span id="${fragment}" class="offset-anchor"></span>
						<a href="blog/${slug}#${fragment}" class="anchor" aria-hidden="true"></a>
						${text}
					</h${level}>`;
			};

			const html = marked(
				content.replace(/^\t+/gm, match => match.split('\t').join('  ')),
				{ renderer }
			);

			return {
				html,
				metadata,
				slug,
				locale
			};
		})
		.sort((a, b) => a.metadata.pubdate < b.metadata.pubdate ? 1 : -1);
}
