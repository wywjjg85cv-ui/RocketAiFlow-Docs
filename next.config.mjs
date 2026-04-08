import nextra from "nextra";

const withNextra = nextra({
  search: {
    codeblocks: false
  }
});

export default withNextra({
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  images: {
    qualities: [50, 75, 90, 95]
  }
});
