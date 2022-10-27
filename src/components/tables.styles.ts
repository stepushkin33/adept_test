import styled from "styled-components";

export const Table = styled.table`
  max-width: 500px;
  width: 100%;
  border-collapse: collapse;
  border: 2px solid #00bfff;
  margin-right: 100px;

  td:nth-child(1) {
    width: 10%;
  }
  td:nth-child(2) {
    width: 30%;
  }
  td:nth-child(3) {
    width: 30%;
  }
  td:nth-child(4) {
    width: 30%;
  }
`;

export const Td = styled.td`
  border: 1px solid #00bfff;
  padding: 10px;
  vertical-align: center;
  height: 40px;
`;

export const Tr = styled.tr<{ $active: boolean }>`
  background-color: ${({ $active }) => ($active ? "#80A6FF" : "")};
`;
