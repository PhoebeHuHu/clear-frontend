"use client";
import styled from "styled-components";
import EDIForm from "@/app/components/EDIParser";
import Output from "@/app/components/Output";
import EDIGenerator from "@/app/components/EDIGenerator";
import { useState } from "react";
import { IProcessingError } from "@/types/cargo";
const Container = styled.div`
  max-width: 1200px;
  margin: 20px auto;
  height: 100%;
`;

const Content = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

const Forms = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export default function Home() {
  const [output, setOutput] = useState("");
  const [outputType, setOutputType] = useState<"cargo" | "edi">("edi");
  const [errors, setErrors] = useState<IProcessingError[]>([]);

  return (
    <Container>
      <h1>EDI Generator</h1>
      <Content>
        <Forms>
          <EDIGenerator
            setOutput={setOutput}
            setOutputType={() => setOutputType("edi")}
            setErrors={setErrors}
          />
          <EDIForm
            setOutput={setOutput}
            setOutputType={() => setOutputType("cargo")}
            setErrors={setErrors}
          />
        </Forms>
        <Output output={output} outputType={outputType} errors={errors} />
      </Content>
    </Container>
  );
}
