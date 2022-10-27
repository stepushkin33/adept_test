import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  height: 200px;
  border: 2px solid #00bfff;
  border-radius: 15px;
  padding: 15px;
  margin-right: 20px;
  margin-left: 20px;
`;

export const Label = styled.label`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 15px;
`;

export const Input = styled.input`
  width: 200px;
  height: 16px;
  border: 1px solid #00bfff;
  border-radius: 10px;
  padding: 4px;
  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;

export const Button = styled.button`
  max-width: 100px;
  min-height: 25px;
  border: 1px solid #00bfff;
  border-radius: 10px;
`;
