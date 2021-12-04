import * as moths from "../../assets/moths/*";
import any_browser from "url:../../assets/rh-anim.gif";
import moth_flying from "url:../../assets/moth_flying.gif";
import moth_flying2 from "url:../../assets/moth_flying2.gif";
import { Link } from "react-router-dom";

export const Home = () => {
  const mothsForGallery = Object.values(moths);
  mothsForGallery.splice(5);

  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <div
        style={{
          alignItems: "center",
          display: "flex",
          marginBottom: "30px",
          justifyContent: "center",
        }}
      >
        <img src={moth_flying} alt="Moth flying" />

        <div
          style={{
            fontWeight: "bold",
            fontSize: "6em",
            marginLeft: "1em",
            marginRight: "1em",
          }}
        >
          moth.fans
        </div>

        <img src={moth_flying2} alt="Moth flying" />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            height: "400px",
            width: "800px",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
          <div className="marquee">
            {mothsForGallery.map((moth) => (
              <img
                key={moth}
                src={moth}
                style={{
                  display: "inline-block",
                  height: "400px",
                  paddingRight: "10px",
                }}
                alt="Moth"
              />
            ))}
          </div>
        </div>

        <p
          style={{
            border: "double black",
            marginLeft: "1em",
            padding: "1%",
            maxWidth: "400px",
          }}
        >
          Moths are a group of lepidopteran insects that includes a large
          diversity of species worldwide. As is well known, this group of
          organisms produces a particularly rich diversity of ornamental
          materials. Moths provide a huge range of different colour patterns. As
          a consequence, their products, in particular for use in making a
          variety of textiles, are highly sought-after by textile manufacturers.
          Moths are also very attractive insects to observe and study. This is
          due to their diversity in colour and behaviour. Moths also have a long
          and interesting history which is closely linked with the evolution and
          development of human civilisation. The earliest written records of
          moths date back to around 30-35 BC and were found on papyrus scrolls
          in Egypt. The use of silk as a textile material appears to have been a
          long process. As a consequence, the earliest moth silk and the
          earliest moth silks known date back to around the first or second
          century BC.
        </p>
      </div>

      <div
        style={{
          fontSize: "2em",
          marginTop: "30px",
        }}
      >
        <div>
          Check out <Link to="/data">SS13 Data</Link>!
        </div>

        <div>
          Or browse some <Link to="/moths">Moths</Link>!
        </div>
      </div>

      <p>
        <a href="http://www.anybrowser.org/campaign/">
          <img src={any_browser} alt="Viewable With Any Browser" />
        </a>
      </p>
    </div>
  );
};
