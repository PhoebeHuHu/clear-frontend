import React from "react";
import GeneralSession from "@/components/GeneralSession";
import styled from "styled-components";
import { ICargoItem } from "@/types/cargo";
import { IProcessingError } from "@/types/cargo";
import CargoCard from "@/app/components/EDIGenerator/components/CargoCard";
import { ErrorMessages } from "@/constants/errorMessages";

const Pre = styled.pre`
  white-space: pre-wrap;
  word-wrap: break-word;
`;
const Placeholder = styled.div`
  color: #666;
`;
const ErrorMessage = styled.div`
  color: #ff6b6b;
  padding: 10px;
  border: 1px solid #ff6b6b;
  border-radius: 4px;
  margin: 10px 0;
`;

const ErrorList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 10px 0;
`;

const ErrorItem = styled.li`
  margin: 5px 0;
  padding: 5px;
`;

const ScrollableContainer = styled.div`
  height: 640px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

interface IOutputProps {
  output: string;
  outputType: "cargo" | "edi";
  errors?: IProcessingError[];
}

const Output = ({ output, outputType, errors }: IOutputProps) => {
  const renderErrors = () => {
    if (!errors || errors.length === 0) return null;

    return (
      <ErrorMessage>
        <h3>Errors in processing:</h3>
        <ErrorList>
          {errors.map((error, index) => (
            <ErrorItem key={index}>
              {error.index !== undefined && <div>Item {error.index + 1}:</div>}
              <div>{error.message}</div>
            </ErrorItem>
          ))}
        </ErrorList>
      </ErrorMessage>
    );
  };

  const renderCargoOutput = () => {
    try {
      const cargoItems: ICargoItem[] = JSON.parse(output);
      return (
        <>
          {cargoItems.map((item: ICargoItem, index: number) => (
            <CargoCard
              key={index}
              item={item}
              index={index}
              removeable={false}
            />
          ))}
        </>
      );
    } catch (error) {
      console.error(ErrorMessages.EDI.DECODE_FAILED, error);
      return (
        <ErrorMessage>
          <h3>Error parsing cargo data:</h3>
          <p>
            {error instanceof Error
              ? error.message
              : ErrorMessages.EDI.DECODE_FAILED}
          </p>
          <p>Raw output:</p>
          <Pre>{output}</Pre>
        </ErrorMessage>
      );
    }
  };

  const renderEDIOutput = () => {
    if (!output.trim()) {
      return (
        <Placeholder>
          Cargo information and EDI message will appear here after you parse or
          generate it
        </Placeholder>
      );
    }
    return <Pre>{output}</Pre>;
  };

  return (
    <GeneralSession title="Output">
      <ScrollableContainer>
        {renderErrors()}
        {outputType === "cargo" ? renderCargoOutput() : renderEDIOutput()}
      </ScrollableContainer>
    </GeneralSession>
  );
};

export default Output;
