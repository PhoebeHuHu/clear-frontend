import React, { useState } from "react";
import GeneralSession from "@/components/GeneralSession";
import Button from "@/components/Button";
import styled from "styled-components";
import { IProcessingError } from "@/types/cargo";
import { ediService } from "@/api/api";
import { ErrorMessages } from "@/constants/errorMessages";

interface IEDIParserProps {
  setOutput: (output: string) => void;
  setOutputType: () => void;
  setErrors: (errors: IProcessingError[]) => void;
}

const Textarea = styled.textarea`
  width: 100%;
  height: 100px;
  border: 1px solid #444;
  border-radius: 5px;
  background: transparent;
  outline: none;
  color: white;
  padding: 10px;
  &:focus {
    border-color: #999;
  }
  &::placeholder {
    color: #666;
  }
`;

const EDIParser = ({
  setOutput,
  setOutputType,
  setErrors,
}: IEDIParserProps) => {
  const [ediText, setEdiText] = useState("");
  const [loading, setLoading] = useState(false);
  const handleParseEDI = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await ediService.decodeEDI(ediText);
      setOutput(JSON.stringify(res.cargo_items, null, 2));
      setOutputType();
      setErrors(res.errors || []);
    } catch (error) {
      console.error(error);
      setErrors([{ message: ErrorMessages.EDI.DECODE_FAILED }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <GeneralSession title="EDI Form">
      <form onSubmit={handleParseEDI}>
        <Textarea
          value={ediText}
          onChange={(e) => setEdiText(e.target.value)}
          placeholder="Enter EDI text"
          required
        />
        <Button variant="filled" type="submit" disabled={loading}>
          {loading ? "Parsing..." : "Parse EDI"}
        </Button>
      </form>
    </GeneralSession>
  );
};

export default EDIParser;
