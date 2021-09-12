import React from 'react';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import JS from './js.png';

const IntroHeaderContainerSkewed = styled.div`
  min-height: 440px;
  /* background: linear-gradient(3deg, black 40%, ${props => props.theme.palette.primary.main} 40% 60%); */
  background-color: ${props => props.theme.palette.primary.main};
  position: absolute;
  width: 120vw;
  transform: rotate(4deg) translateX(-10vw) translateY(-10vh);
  z-index: -1;
  &:after {
    content: "";
    position: absolute;
    top: 60px;
    left: 0;
    bottom: 0;
    right: 0;
    opacity: 0.1;
    background-image: url(${JS});
    background-size: 260px;
    background-repeat: no-repeat;
    background-position: 70% 100px;
    transform: rotate(-4deg);
  }

  @media (min-height: 1000px) {
    min-height: 480px;
  }
`;

const IntroHeaderContainer = styled.div`
  min-height: 440px;
`;

const TitleContainer = styled.div`
  height: 360px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 64px;
  font-weight: 600;
  color: white;
  user-select: none;
  font-family: 'Roboto';
  text-align: center;
  margin: 4px;
`;

const SubTitle = styled.div`
  font-size: 20px;
  line-height: 28px;
  color: white;
  font-family: 'Roboto';
  text-align: center;
`;

const GetStartedButton = withStyles((theme) => ({
  root: {
    marginTop: '36px',
    backgroundColor: '#fff',
    '&:hover': {
      backgroundColor: '#fff',
      opacity: 0.94,
    },
  },
}))(Button);

export function IntroHeader() {
  return (
    <IntroHeaderContainer>
      <div style={{ position: 'relative' }}>
        <IntroHeaderContainerSkewed />
      </div>
      <TitleContainer>
        <Title>Promise Utils</Title>
        <SubTitle>We're trying to help you, I Promise</SubTitle>
        <GetStartedButton variant="contained" color="default">
          Get started
        </GetStartedButton>
      </TitleContainer>
    </IntroHeaderContainer>
  );
}
