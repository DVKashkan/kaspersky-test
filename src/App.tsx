import React, { useState } from "react";
import { Layout, Tag } from "antd";
import { articleData } from './data/data';
import LanguageIcon from "@mui/icons-material/Language";
import {
  CaretUpOutlined,
  CaretDownOutlined,
  DownOutlined,
  UpOutlined,
  ReadOutlined,
  FlagOutlined
} from "@ant-design/icons";



import "./styles/main.scss";

const App: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const [showRelevanceBlock, setShowRelevanceBlock] = useState(true);

  const date = new Date(articleData.DP).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });

  const sentimentColor = articleData.sentiment === "Negative" ? "red" : "green";
  const sumTraffic = articleData.TRAFFIC.reduce((sum, item) => sum + item.count, 0);

  const formattedHighlights = articleData.HIGHLIGHTS.map((text, index) => {
    const formattedText = text.replace(/<kw>(.*?)<\/kw>/g, '<span class="kw">$1</span>');
    return (
      <div
        key={index}
        dangerouslySetInnerHTML={{ __html: formattedText }}
      />
    );
  });

  return (
    <Layout className="app-container">
      <div className="article-header">
        <div className="article-list">
          <span className="date">{date}</span>
          <span className="reach">{articleData.reach}K Reach</span>
          <div className="traffic-list">
            <span>Top Traffic:</span>
            {articleData.TRAFFIC.map(({ value, count }, index) => (
              <div key={index} className="traffic-item">
                <span className="country">{value}</span>
                <span className="count">{Math.round((count / sumTraffic) * 100)}%</span>
              </div>
            ))}
          </div>
        </div>
        <div className="tag">
          <Tag color={sentimentColor} style={{ margin: "0px" }}>{articleData.sentiment}</Tag>
          <div className="block-i">i</div>
          <div className="block-i"></div>
        </div>
      </div>

      <div className="title">
        <span>{articleData.TI}</span>
      </div>

      <div className="description-header">
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "5px"
        }}>
          <LanguageIcon style={{ width: 18, height: 18 }} />
          <a href={articleData.URL}>Punto-info.it</a>
        </div>
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "5px"
        }}>
          <FlagOutlined />
          <span>{articleData.CNTR}</span>
        </div>
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "5px"
        }}>
          <ReadOutlined />
          <span>{articleData.CNTR_CODE}</span>
        </div>
        <span>{articleData.author}</span>
      </div>

      <div className={`highlight-wrapper ${expanded ? "expanded" : ""}`}>
        {formattedHighlights}
      </div>

      {articleData.HIGHLIGHTS.length > 0 && (
        <span className="show-toggle" onClick={() => setExpanded(!expanded)}>
          {expanded ? "Show less" : "Show more"} { }
          {expanded ? <CaretUpOutlined /> : <CaretDownOutlined />}
        </span>
      )}

      <div className="keywords">
        <div className="keyword-list">
          {articleData.KW.map(({ value, count }, index) => (
            <span key={index} className="keyword">
              {value} ({count})
            </span>
          ))}
        </div>
      </div>

      <button className="origin">Original Source</button>


      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span style={{ color: "gray", marginTop: "20px" }}>
          Duplicates: <span style={{ color: "white" }}>192</span>
        </span>
        <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginTop: "20px" }}>
          <div
            onClick={() => setShowRelevanceBlock(prev => !prev)}
            style={{
              cursor: "pointer",
              color: "#007bff",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center"
            }}
          >
            By Relevance {showRelevanceBlock ? <UpOutlined style={{ marginLeft: "6px" }} /> : <DownOutlined style={{ marginLeft: "6px" }} />}
          </div>
        </div>
      </div>

      {showRelevanceBlock && (
        <div style={{ border: "1px solid #007bff", borderRadius: "8px", padding: "10px", marginTop: "10px" }}>
          <div className="short-description">
            <div className="lower-list">
              <span className="date">{date}</span>
              <span className="reach">{articleData.reach}K Reach</span>
            </div>
            <div className="lower-block-i">
              <div className="block-i">i</div>
              <div className="block-i"></div>
            </div>
          </div>
          <div className="title">
            <span>{articleData.TI}</span>
          </div>
          <div className="description-lower-block">
            <img src="https://ria.ru/favicon.ico" alt="ria.ru icon" width="16" height="16" />
            <a href="https://ria.ru">ria.ru</a>
            <div style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "5px"
            }}>
              <FlagOutlined />
              <span>{articleData.CNTR}</span>
            </div>
            <span>{articleData.author}</span>
          </div>
        </div>
      )}

      <div style={{
        border: "1px solid gray",
        borderRadius: '8px',
        padding: "10px",
        marginTop: "10px",
        display: "flex",
        justifyContent: "center",
        gap: "10px"
      }}>
        <DownOutlined />
        <span>View Duplicates</span>
      </div>
    </Layout>
  );
};

export default App;
