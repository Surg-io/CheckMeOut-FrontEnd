import { useState, useEffect } from "react";
import { Card, Button, Spin, Alert } from "antd";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialLight } from "react-syntax-highlighter/dist/cjs/styles/prism";

const markdownComponents = {
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || "");
    return !inline && match ? (
      <SyntaxHighlighter
        style={materialLight}
        language={match[1]}
        PreTag="div"
        {...props}
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
  table: ({ node, ...props }) => (
    <div style={{ overflowX: "auto", margin: "16px 0" }}>
      <table style={{ 
        width: "100%", 
        borderCollapse: "collapse",
        boxShadow: "0 1px 3px rgba(0,0,0,0.12)"
      }} {...props} />
    </div>
  ),
  th: ({ node, ...props }) => (
    <th style={{ 
      padding: "12px",
      backgroundColor: "#fafafa",
      border: "1px solid #e8e8e8",
      fontWeight: 600 
    }} {...props} />
  ),
  td: ({ node, ...props }) => (
    <td style={{ 
      padding: "12px",
      border: "1px solid #e8e8e8"
    }} {...props} />
  ),
  img: ({ src, alt }) => (
    <img
      src={src}
      alt={alt}
      style={{
        maxWidth: "100%",
        height: "auto",
        borderRadius: "8px",
        margin: "16px 0",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
      }}
    />
  )
};

export const Articles = ({ 
  category,
  manifestPath = "/manifest.json",
  contentRoot = "/",
  cardStyle,
  renderBackButton = true,
}) => {
  const [state, setState] = useState({
    items: [],
    selectedArticle: null,
    articleContent: "",
    loading: false,
    error: null
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        setState(prev => ({ ...prev, loading: true }));
        
        const manifestRes = await fetch(manifestPath);
        if (!manifestRes.ok) throw new Error("Manifest load failed");
        
        const manifest = await manifestRes.json();
        const categoryItems = manifest[category] || [];
        
        if (categoryItems.length === 1) {
          const contentRes = await fetch(`${contentRoot}${categoryItems[0].index}`);
          const content = await contentRes.text();
          setState({
            items: categoryItems,
            selectedArticle: categoryItems[0],
            articleContent: content,
            loading: false,
            error: null
          });
        } else {
          setState({
            items: categoryItems,
            selectedArticle: null,
            articleContent: "",
            loading: false,
            error: null
          });
        }
      } catch (err) {
        setState(prev => ({
          ...prev,
          loading: false,
          error: err.message
        }));
      }
    };

    loadData();
  }, [category, manifestPath, contentRoot]);

  const handleViewMore = async (item) => {
    try {
      setState(prev => ({ ...prev, loading: true }));
      
      const res = await fetch(`${contentRoot}${item.index}`);
      if (!res.ok) throw new Error("Content load failed");
      
      const content = await res.text();
      setState(prev => ({
        ...prev,
        articleContent: content,
        selectedArticle: item,
        loading: false
      }));
    } catch (err) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: err.message
      }));
    }
  };

  const handleBack = () => {
    setState(prev => ({
      ...prev,
      selectedArticle: null,
      articleContent: ""
    }));
  };

  if (state.error) {
    return (
      <Alert
        type="error"
        message="Load error"
        description={state.error}
        showIcon
        style={{ margin: 24 }}
      />
    );
  }

  if (state.loading) {
    return <Spin size="large" style={{ display: "block", margin: "24px auto" }} />;
  }

  return (
    <Card
      variant="borderless"
      style={{
        boxShadow: "none",
        borderRadius: 0,
        margin: 16,
        ...cardStyle
      }}
    >
      <div style={{ padding: 24 }}>
        {state.selectedArticle ? (
          <div>
            {renderBackButton && (
              <Button 
                type="link" 
                onClick={handleBack}
                style={{ 
                  marginBottom: 16,
                  paddingLeft: 0
                }}
              >
                ← Back
              </Button>
            )}
            
            <h1 style={{ 
              marginBottom: 24,
              fontSize: "2rem",
              fontWeight: 600
            }}>
              {state.selectedArticle.title}
            </h1>

            {state.selectedArticle.cover && (
              <img
                src={state.selectedArticle.cover}
                alt="cover"
                style={{
                  width: "100%",
                  maxHeight: 400,
                  objectFit: "cover",
                  borderRadius: 8,
                  marginBottom: 24
                }}
              />
            )}

            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={markdownComponents}
            >
              {state.articleContent}
            </ReactMarkdown>
          </div>
        ) : (
          <div style={{ 
            display: "grid",
            gap: 24,
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))"
          }}>
            {state.items.map((item) => (
              <Card
                key={item.name}
                hoverable
                cover={
                  <img
                    alt={item.title}
                    src={item.cover}
                    style={{ 
                      height: 200,
                      objectFit: "cover",
                      borderTopLeftRadius: 8,
                      borderTopRightRadius: 8
                    }}
                  />
                }
              >
                <Card.Meta
                  title={item.title}
                  description={
                    <Button 
                      type='link' 
                      onClick={() => handleViewMore(item)}
                      block
                    >
                      View More
                    </Button>
                  }
                />
              </Card>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};