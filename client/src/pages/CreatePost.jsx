import { useState } from "react";
import GenerateImageForm from "../components/GenerateImageForm";
import GeneratedImage from "../components/GeneratedImage";
import styled from "styled-components";

/* PAGE BACKGROUND */
const Page = styled.div`
  min-height: calc(100vh - 54px);
  width: 100%;

  background: #0b1220; /* same as GenerateImageForm */
  padding: 20px 10px;
`;

/* GRID LAYOUT */
const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;

  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CreatePost = () => {

  const [generateImageLoading, setGenerateImageLoading] = useState(false)
  const [createPostLoading, setCreatePostLoading] = useState(false)
  const [post, setPost] = useState({
    author: "",
    prompt: "",
    photo: ""
  })
  return (
    <Page>
      <Layout>
        <GenerateImageForm  
            post={post} 
            setPost={setPost} 
            createPostLoading={createPostLoading} 
            generateImageLoading={generateImageLoading} 
            setGenerateImageLoading={setGenerateImageLoading}
            setCreatePostLoading={setCreatePostLoading}
            />
        <GeneratedImage 
            src={post.photo} 
            loading={generateImageLoading}/>
      </Layout>
    </Page>
  );
};

export default CreatePost;
