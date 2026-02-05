import React from "react";
import styled from "styled-components";

/* CANVAS */
const Canvas = styled.div`
  width: 100%;
  min-height: 420px;

  background: #020617;
  border: 1px dashed #1e243b;
  border-radius: 18px;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #64748b;
  font-size: 14px;

  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.04),
    0 20px 40px rgba(0, 0, 0, 0.35);
`;

/* IMAGE */
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 18px;
`;

/* EMPTY STATE */
const EmptyText = styled.div`
  text-align: center;
  max-width: 260px;
  line-height: 1.5;
`;

const LoadingText = styled.div`
  color: #94a3b8;
`;

const GeneratedImage = ({ src, loading }) => {
  return (
    <Canvas>
      {loading && <LoadingText>Generating your image…</LoadingText>}

      {!loading && src && <Image src={src} alt="Generated image" />}

      {!loading && !src && (
        <EmptyText>
          Write a prompt to generate an image.
        </EmptyText>
      )}
    </Canvas>
  );
};

export default GeneratedImage;
