import React, { useEffect, useState, useRef } from 'react';
import { List, Typography, Card, Spin, message } from 'antd';
import axios from 'axios';

const { Title } = Typography;

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef();

  const fetchNews = async (pageNum) => {
    const apiKey = '91fc86d833d343778069fd9aadf18d1c';
    const pageSize = 5; // Number of articles to load per request
    const url = `https://newsapi.org/v2/everything?q=trucking+industry&language=en&sortBy=publishedAt&page=${pageNum}&pageSize=${pageSize}&apiKey=${apiKey}`;

    try {
      const response = await axios.get(url);
      const articles = response.data.articles || [];
      setNews((prevNews) => [...prevNews, ...articles]);
      setHasMore(articles.length === pageSize); // If less than pageSize, no more news
      setLoading(false);
    } catch (error) {
      message.error('Failed to fetch news. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    //fetchNews(page);
    setLoading(false)
  }, [page]);

  const handleObserver = (entries) => {
    const [entry] = entries;
    if (entry.isIntersecting && hasMore && !loading) {
      setLoading(true);
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    });

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [hasMore, loading]);

  return (
    <div
      style={{
        flex: '1.5 0 30%',
        margin: 20,
        height: '70vh',
        overflowY: 'auto',
        padding: '16px',
        background: '#f0f2f5',
        border: '1px solid #d9d9d9',
        borderRadius: '8px',
      }}
    >
      <Title level={4} style={{ textAlign: 'center' }}>
        Trucking Industry News
      </Title>
      <List
        dataSource={news}
        renderItem={(item) => (
          <List.Item>
            <Card
              hoverable
              style={{ width: '100%' }}
              cover={
                item.urlToImage ? (
                  <img
                    alt={item.title}
                    src={item.urlToImage}
                    style={{ maxHeight: '200px', objectFit: 'cover' }}
                  />
                ) : null
              }
            >
              <Card.Meta
                title={
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    {item.title}
                  </a>
                }
                description={item.source.name}
              />
            </Card>
          </List.Item>
        )}
      />
      {loading && <Spin size="large" style={{ display: 'block', margin: '20px auto' }} />}
      <div ref={observerRef} style={{ height: '1px', marginTop: '-1px' }} />
    </div>
  );
};

export default News;