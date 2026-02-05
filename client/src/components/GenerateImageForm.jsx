import React, { useState } from "react";
import styled from "styled-components";
import { AutoAwesome, Edit } from "@mui/icons-material";
import { createPost, GenerateAIImage } from "../api";
import { useNavigate} from "react-router-dom"

/* PAGE */
const Page = styled.div`
  min-height: calc(100vh - 64px);
  width: 100%;
  background: #0b1220;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 50px 20px;
  font-family: "Inter", system-ui, sans-serif;
`;

/* WRAPPER */
const Wrapper = styled.div`
  width: 100%;
  max-width: 680px;
`;

/* HERO */
const Hero = styled.h1`
  font-size: 44px;
  font-weight: 700;
  line-height: 1.15;
  color: #e5e7eb;
  margin-bottom: 56px;
`;

/* FORM */
const Form = styled.div``;

/* FIELD */
const Field = styled.div`
  margin-bottom: 22px;
`;

/* LABEL */
const Label = styled.label`
  display: block;
  font-size: 12px;
  font-weight: 600;
  color: #94a3b8;
  margin-bottom: 6px;
`;

/* INPUT */
const Input = styled.input`
  width: 100%;
  padding: 14px 16px;
  background: #020617;
  border: 1px solid #1e293b;
  border-radius: 10px;
  color: #e5e7eb;
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: #475569;
  }
`;

/* TEXTAREA */
const TextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 14px 16px;
  background: #020617;
  border: 1px solid #1e293b;
  border-radius: 10px;
  color: #e5e7eb;
  font-size: 14px;
  resize: none;
  outline: none;

  &:focus {
    border-color: #475569;
  }
`;

/* ACTIONS */
const Actions = styled.div`
  display: flex;
  gap: 14px;
  margin-top: 30px;
`;

/* PRIMARY BUTTON */
const PrimaryButton = styled.button`
  flex: 1;
  padding: 14px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: #e5e7eb;
  color: #020617;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

/* SECONDARY BUTTON */
const SecondaryButton = styled.button`
  flex: 1;
  padding: 14px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: transparent;
  color: #e5e7eb;
  border: 1px solid #1e293b;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.04);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;



/* COMPONENT */
const GenerateImageForm = ({
  post,
  setPost,
  generateImageLoading,
  setGenerateImageLoading,
  createPostLoading,
  setCreatePostLoading,
}) => {
  const navigate = useNavigate();
  const [error, setError] = useState("")
  const generateImageFun = async () => {
    setGenerateImageLoading(true);
    
    // 🔥 call your image generation API here

    await GenerateAIImage ({prompt: post.prompt}).then((res) => {
      setPost({
      ...post,
      photo: `data:image/jpeg;base64,${res?.data?.photo}`,
    });
      setError(error?.response?.data?.message)
      setGenerateImageLoading(false)
    }).catch((err)=>{
      console.log(err)
    })
  };

  const createPostFun = async () => {
    setCreatePostLoading(true);
    await createPost (post).then((res) => {
      setCreatePostLoading(false)
      navigate("/")
    }) 
    .catch((err)=>{
      setError(error?.response?.data?.message)
      setCreatePostLoading(false)
    })

  };

  return (
    <Page>
      <Wrapper>
        <Hero>Give shape to your imagination.</Hero>

        <Form>
          <Field>
            <Label>Your name</Label>
            <Input
              placeholder="Jane Doe"
              value={post.name}
              onChange={(e) =>
                setPost({ ...post, name: e.target.value })
              }
            />

          </Field>

          <Field>
            <Label>Prompt</Label>
            <TextArea
              placeholder="Describe what you want to create…"
              value={post.prompt}
              onChange={(e) =>
                setPost({ ...post, prompt: e.target.value })
              }
            />
          </Field>
              {error && <div style={{color: "red"}}>{error} </div>}
          <Actions>
            <PrimaryButton
              onClick={generateImageFun}
              disabled={generateImageLoading || post.prompt === ""}
            >
              <AutoAwesome fontSize="small" />
              {generateImageLoading ? "Generating…" : "Generate"}
            </PrimaryButton>

            <SecondaryButton
              onClick={createPostFun}
              disabled={
                createPostLoading ||
                post.name === "" ||
                post.prompt === "" ||
                post.photo === ""
              }
            >
              <Edit fontSize="small" />
              {createPostLoading ? "Posting…" : "Post"}
            </SecondaryButton>
          </Actions>
        </Form>
      </Wrapper>
    </Page>
  );
};

export default GenerateImageForm;
