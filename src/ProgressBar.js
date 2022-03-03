import React, { Component } from "react";

import styled, { css, keyframes } from "styled-components";

export default class ProgressBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <StyledWrapper>
        {/* This Bar is always red */}
        <StyledBar stepIdx={-1} currentStepIdx={-1} />

        <Steps>
          {Object.keys(this.props.stepMap).map(
            (val, idx) =>
              idx < Object.keys(this.props.stepMap).length - 1 && (
                <>
                  {idx !== 0 && (
                    <StyledBar
                      stepIdx={idx}
                      currentStepIdx={Object.keys(this.props.stepMap).indexOf(
                        this.props.checkoutStep
                      )}
                    />
                  )}
                  <CircleWrapper>
                    <Circle
                      stepIdx={idx}
                      currentStepIdx={Object.keys(this.props.stepMap).indexOf(
                        this.props.checkoutStep
                      )}
                    >
                      {idx <=
                      Object.keys(this.props.stepMap).indexOf(
                        this.props.checkoutStep
                      ) -
                        1
                        ? "✔"
                        : `${idx + 1}`}
                    </Circle>
                    <StepTitle
                      stepIdx={idx}
                      currentStepIdx={Object.keys(this.props.stepMap).indexOf(
                        this.props.checkoutStep
                      )}
                    >
                      {this.props.stepMap[val].title}
                    </StepTitle>
                  </CircleWrapper>
                </>
              )
          )}
        </Steps>
        <StyledBar
          stepIdx={Object.keys(this.props.stepMap).length - 1}
          currentStepIdx={Object.keys(this.props.stepMap).indexOf(
            this.props.checkoutStep
          )}
        />
      </StyledWrapper>
    );
  }
}
/*STYLES*/
const StyledWrapper = styled.div`
  position: absolute;
  top: 1%;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  margin: 5px;
  align-self: center;
`;
const LoadingAnim = keyframes`
0%{
    background-position: right bottom;
}
50%{
    background-position: left bottom;
}
`;
const FadeAnim = keyframes`
0%
{
  transform: opacity( 0 );
}

100%{
    transform:opacity(1);
    background-color:#a21028;
    color:#ffffff;
}`;
const StyledBar = styled.div`
  flex: 10;
  padding: 2px;
  height: 1px;
  border-radius: 2px;
  background-color: ${(props) =>
    props.stepIdx <= props.currentStepIdx ? "#a21028" : "#dadada"};
  align-self: center;

  ${(props) =>
    props.stepIdx === props.currentStepIdx
      ? css`
          background: linear-gradient(to right, #a21028 50%, #dadada 50%);
          background-size: 200% 100%;
          animation: ${LoadingAnim} 1s linear;
        `
      : ""}
`;
const Steps = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-self: center;
  align-items: center;
  flex: 9;
`;
const CircleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5px;
`;
const Circle = styled.div`
  width: 30px;
  height: 30px;
  padding: 10px;
  border-radius: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  ${(props) =>
    props.stepIdx === props.currentStepIdx
      ? css`
          animation: ${FadeAnim} 0.2s linear 0.6s;
          animation-fill-mode: forwards;
        `
      : css`
          background-color: ${props.stepIdx <= props.currentStepIdx
            ? "#a21028"
            : "#dadada"};
          color: ${props.stepIdx <= props.currentStepIdx
            ? "#ffffff"
            : "#000000"};
        `}

`;
const StepTitle = styled.span`
  position: absolute;
  bottom: -2rem;
  font-size:14px;
  display: inline;
  width: 180px;
  text-align: center;
  color: ${(props) =>
    props.stepIdx <= props.currentStepIdx ? "#000000" : "#9e9e9e"};
  font-weight:${(props) =>
    props.stepIdx <= props.currentStepIdx ? "bold" : "default"};
`;
