import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import "./Home.css";
import ImageCard from "../components/ImageCard";
import styled from "styled-components";
import { GetPosts } from "../api";
import { useEffect } from "react";

// styled-components
const CenterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  width: 100%;
`;

const CenterText = styled.p`
  color: #ffffff;
  font-size: 1.2rem;
  font-family: 'Inter', 'Segoe UI', sans-serif;
  font-weight: 500;
  letter-spacing: 0.3px;
  opacity: 0.9;
  text-align: center;
`;

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);

  const getPosts = async () => {
    setLoading(true)
    await GetPosts().then((res)=>{
      setLoading(false)
      setPosts(res?.data?.data)
      setFilteredPosts(res?.data?.data)
    }).catch((err)=>{
      setError(error?.response?.data?.message)
      setLoading(false)
    })
  }

  useEffect(()=>{
    getPosts()
  },[])

  //search

  useEffect(()=>{
    if(!search){
      setFilteredPosts(posts)
    }
    const SearchFilteredPosts = posts.filter((post) => {
      const promptMatch = post?.prompt?.toLowerCase().includes(search.toString().toLowerCase());
      const authorMatch = post?.name?.toLowerCase().includes(search.toString().toLowerCase());

      return promptMatch || authorMatch
    })
    if(search){
      setFilteredPosts(SearchFilteredPosts)
    }
  },[posts, search])

  return (
    <div className="home">
      <div className="home-header">
        <h3 className="home-title">Explore popular posts!</h3>
        <span className="home-subtitle">◈ Generated with AI ◈</span>
      </div>

      <SearchBar search={search} setSearch={setSearch}/>

      {error && <div style={{ color: "red" }}>{error}</div>}

      {loading ? (
        <CenterWrapper>
          <CenterText>Loading images...</CenterText>
        </CenterWrapper>
      ) : (
        <div className="cards">
          {filteredPosts.length === 0 ? (
            <CenterWrapper>
              <CenterText>No posts found</CenterText>
            </CenterWrapper>
          ) : (
            filteredPosts
              .slice()
              .reverse()
              .map((item, index) => (
                <ImageCard key={index} item={item} />
              ))
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
