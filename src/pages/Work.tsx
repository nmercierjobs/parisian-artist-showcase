import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import ArtworkCard from "@/components/ArtworkCard";
import { artworks } from "@/data/artworks";

const Work = () => {
  return (
    <>
      <Helmet>
        <title>Noah Mercier — Engineer</title>
        <meta
          name="description"
          content="Explore the artworks of Émile Laurent, a Paris-based visual artist specializing in oil paintings and classical techniques."
        />
      </Helmet>

      <Layout>
        <div className="page-transition px-6 py-10 lg:px-10 lg:py-12">
          {/* Uniform 2x2 Grid */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-6">
            {artworks.map((artwork, index) => (
              <ArtworkCard 
                key={artwork.id} 
                artwork={artwork} 
                index={index}
              />
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Work;
