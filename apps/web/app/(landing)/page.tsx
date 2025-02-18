export default function LandingPage() {
	return (
		<div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
			<div className="text-center">
				<h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
					Welcome to Our Platform
				</h1>
				<p className="mt-6 text-lg leading-8 text-gray-600">
					Start your journey with us today
				</p>
				<div className="mt-10 flex items-center justify-center gap-x-6">
					<a
						href="/login"
						className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
					>
						Get started
					</a>
					<a
						href="#"
						className="text-sm font-semibold leading-6 text-gray-900"
					>
						Learn more <span aria-hidden="true">→</span>
					</a>
				</div>
			</div>
		</div>
	);
}
