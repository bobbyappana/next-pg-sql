import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
	render() {
		return (
			<Html lang="en">
				<Head>
					<meta
						name="Blogs"
						content="User Blogs"
						description="User Blogs - A user controlled blogs creation"
					/>
					<link
						rel="preload"
						href="/favicon.ico"
						as="image"
						type="image/x-icon"
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
