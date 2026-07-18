import { useNews } from '../hooks/useNews';
import { useTranslation } from '../i18n/LanguageContext';

function NewsCardSkeleton() {
	return (
		<div className="bg-div2-surface border border-div2-border rounded overflow-hidden animate-pulse">
			<div className="w-full aspect-video bg-div2-border/50" />
			<div className="p-4 space-y-2">
				<div className="h-2.5 bg-div2-border/50 rounded w-1/3" />
				<div className="h-4 bg-div2-border/50 rounded w-5/6" />
				<div className="h-3 bg-div2-border/50 rounded w-full" />
				<div className="h-3 bg-div2-border/50 rounded w-2/3" />
			</div>
		</div>
	);
}

function NewsCard({ article }) {
	return (
		<a
			href={article.url}
			target="_blank"
			rel="noopener noreferrer"
			className="group block bg-div2-surface border border-div2-border rounded overflow-hidden hover:border-div2-orange/50 transition-all duration-200"
		>
			{article.image && (
				<div className="overflow-hidden aspect-video">
					<img
						src={article.image}
						alt={article.title}
						className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
						loading="lazy"
					/>
				</div>
			)}
			<div className="p-4">
				<div className="flex items-center gap-2 text-div2-muted text-xs mb-2">
					<span>{article.date}</span>
					{article.readTime && (
						<>
							<span className="w-1 h-1 rounded-full bg-div2-muted/50" />
							<span>{article.readTime}</span>
						</>
					)}
				</div>
				<h3 className="text-white text-sm font-bold leading-snug mb-1.5 group-hover:text-div2-orange transition-colors line-clamp-2">
					{article.title}
				</h3>
				{article.abstract && (
					<p className="text-div2-text/70 text-sm leading-relaxed line-clamp-2">
						{article.abstract}
					</p>
				)}
			</div>
		</a>
	);
}

export function NewsSection() {
	const { articles, loading } = useNews();
	const { t } = useTranslation();

	return (
		<section className="mt-10 border-t border-div2-border pt-6">
			<div className="flex items-center gap-3 mb-6">
				<div className="w-1 h-6 bg-div2-orange" />
				<p className="text-div2-muted text-xs uppercase tracking-widest">
					{t('news.title')}
				</p>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{loading
					? [1, 2, 3].map((i) => <NewsCardSkeleton key={i} />)
					: articles.map((article) => (
						<NewsCard key={article.url} article={article} />
					))
				}
			</div>

			<p className="mt-4 text-right text-xs text-div2-muted/60">
				<a
					href="https://www.ubisoft.com/en-us/game/the-division/the-division-2/news-updates"
					target="_blank"
					rel="noopener noreferrer"
					className="hover:text-div2-orange transition-colors"
				>
					{t('news.seeAll')} ↗
				</a>
			</p>
		</section>
	);
}
