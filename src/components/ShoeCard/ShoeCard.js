import React from "react";
import styled from "styled-components/macro";

import { COLORS, WEIGHTS } from "../../constants";
import { formatPrice, pluralize, isNewShoe } from "../../utils";
import Spacer from "../Spacer";

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  return (
    <Wrapper>
      <Link href={`/shoe/${slug}`}>
        <ImageWrapper>
          {variant === "on-sale" && (
            <SaleBanner>
              <p>Sale</p>
            </SaleBanner>
          )}
          {variant === "new-release" && (
            <JustReleasedBanner>
              <p>Just Released!</p>
            </JustReleasedBanner>
          )}
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          {variant === "on-sale" && (
            <OriginalPrice>{formatPrice(price)}</OriginalPrice>
          )}
          {(variant === "default" || variant === "new-release") && (
            <Price>{formatPrice(price)}</Price>
          )}
        </Row>
        <Row>
          <ColorInfo>{pluralize("Color", numOfColors)}</ColorInfo>
          {variant === "on-sale" && (
            <SalePrice>{formatPrice(salePrice)}</SalePrice>
          )}
        </Row>
      </Link>
    </Wrapper>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article`
  flex: 1;
  min-width: 250px;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 16px 16px 4px 4px;
`;

const SaleBanner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: absolute;
  background-color: ${COLORS.primary};
  color: ${COLORS.white};
  height: 32px;
  width: 50px;
  border-radius: 2px;
  top: 12px;
  right: -4px;
  font-size: ${(14 / 16).toString() + "rem"};
`;

const JustReleasedBanner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: absolute;
  background-color: ${COLORS.secondary};
  color: ${COLORS.white};
  height: 32px;
  width: 118px;
  border-radius: 2px;
  top: 12px;
  right: -4px;
  font-size: ${(14 / 16).toString() + "rem"};
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 1rem;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  color: ${COLORS.gray[900]};
`;

// Modify the price to be crossed out when the shoe is on sale
const OriginalPrice = styled(Price)`
  text-decoration: line-through;
  color: ${COLORS.gray[700]};
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
