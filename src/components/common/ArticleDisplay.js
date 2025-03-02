import { useState, useEffect } from "react";
import { Card, Button } from "antd";
import ReactMarkdown from "react-markdown";

export const Articles = ({ category }) => {
  const [items, setItems] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [articleContent, setArticleContent] = useState("");

  useEffect(() => {
    fetch("/manifest.json")
      .then((res) => res.json())
      .then((data) => {
        setItems(data[category] || []); // Dynamically access the category key from manifest.json
      });
  }, [category]);

  const handleViewMore = (item) => {
    fetch(`/${item.index}`)
      .then((res) => res.text())
      .then((text) => {
        setArticleContent(text);
        setSelectedArticle(item);
      });
  };

  const handleBack = () => {
    setSelectedArticle(null);
    setArticleContent("");
  };

  return (
    <Card
      variant='borderless'
      style={{
        boxShadow: 'none',
        borderRadius: "0",
        margin: '10px',
      }}
    >
      <div style={{ padding: "20px" }}>
        {selectedArticle ? (
          <div>
            <Button type="primary" onClick={handleBack} style={{ marginBottom: "16px" }}>
              ← Back
            </Button>
            <h1>{selectedArticle.title}</h1>
            <img
              src={selectedArticle.cover}
              alt="Cover"
              style={{
                width: "100%",
                maxHeight: "300px",
                objectFit: "cover",
                marginLeft: "2px",
                marginRight: "2px",
                marginBottom: "16px",
                borderRadius: "0",
              }}
            />

            <ReactMarkdown
              components={{
                img: ({ src, alt }) => (
                  <img
                    src={src}
                    alt={alt}
                    style={{
                      width: "100%",  // Makes sure the image fits within the container
                      maxWidth: "100%",  // Prevents overflow
                      maxHeight: "300px", // Limits the height
                      objectFit: "contain",  // Maintains aspect ratio
                      display: "block",  // Prevents inline issues with spacing
                      marginBottom: "16px",  // Adds space below the image
                    }}
                  />
                ),
              }}
            >
              {articleContent}
            </ReactMarkdown>
          </div>
        ) : (
          <div style={{ display: "grid", gap: "16px", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}>
            {items.map((item) => (
              <Card
                key={item.name}
                title={item.title}
                cover={<img
                  src={item.cover}
                  style={{
                    width: "100%",  // Makes sure the image fits within the container
                    height: "200px", // Limits the height
                    objectFit: "cover" ,
                    marginLeft: "1px",
                    marginRight: "1px",
                    borderRadius: "0",
                  }}
                />}
              >
                <Button type="link" onClick={() => handleViewMore(item)}>view more</Button>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};
