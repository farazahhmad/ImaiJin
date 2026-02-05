import React from "react";
import styled from "styled-components";
import { LazyLoadImage } from "react-lazy-load-image-component";
import FileSaver from "file-saver";

/* OUTER SLOT */
const CardContainer = styled.div`
  width: 100%;
  height: 100%;
`;

/* CARD */
const Card = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 14px;
  overflow: hidden;
  background: #020617;
`;

/* IMAGE */
const Image = styled(LazyLoadImage)`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  transition: filter 0.3s ease, transform 0.3s ease;
`;

/* OVERLAY */
const Overlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 16px;
  background: linear-gradient(
    to top,
    rgba(2, 6, 23, 0.9),
    rgba(2, 6, 23, 0.2),
    transparent
  );
  opacity: 0;
  transition: opacity 0.3s ease;
`;

/* TEXT */
const Prompt = styled.div`
  color: #e5e7eb;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
`;

const Author = styled.div`
  color: #7c3aed;
  font-size: 12px;
  font-weight: 700;
`;

const DownloadBtn = styled.button`
  margin-top: 8px;
  align-self: flex-start;

  padding: 6px 12px;

  font-size: 12px;
  font-weight: 500;

  background: transparent;
  color: #e5e7eb;

  border: 1px solid #1e293b;
  border-radius: 6px;

  cursor: pointer;

  transition: 
    background-color 0.15s ease,
    border-color 0.15s ease,
    color 0.15s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
    border-color: #334155;
  }

  &:active {
    background-color: rgba(255, 255, 255, 0.08);
  }
`;



/* HOVER */
const HoverWrapper = styled.div`
  height: 100%;

  &:hover ${Image} {
    filter: blur(3px) brightness(0.85);
    transform: scale(1.05);
  }

  &:hover ${Overlay} {
    opacity: 1;
  }
`;

const ImageCard = ({ item }) => {
  if (!item) return null; // ✅ SAFETY CHECK

  return (
    <CardContainer>
      <HoverWrapper>
        <Card>
          <Image src={item.photo} alt={item.prompt || "AI generated"} />

          <Overlay>
            <Prompt>{item.prompt}</Prompt>
            <Author>by @{item.name}</Author>

            <DownloadBtn
              onClick={() =>
                FileSaver.saveAs(item.photo, "generated-image.jpg")
              }
            >
              <i class="fa-solid fa-download"></i>Download
            </DownloadBtn>
          </Overlay>
        </Card>
      </HoverWrapper>
    </CardContainer>
  );
};

export default ImageCard;
