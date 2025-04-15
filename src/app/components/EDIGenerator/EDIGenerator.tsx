import Button from "@/components/Button";
import CargoCard from "@/app/components/EDIGenerator/components/CargoCard";
import CargoForm from "@/app/components/EDIGenerator/components/CargoForm";
import GeneralSession from "@/components/GeneralSession";
import Modal from "@/components/Modal";

import { ICargoItem, IProcessingError } from "@/types/cargo";
import React, { useState } from "react";
import styled from "styled-components";
import { ediService } from "@/api/api";
import { ErrorMessages } from "@/constants/errorMessages";

interface IEDIGeneratorProps {
  setOutput: (output: string) => void;
  setOutputType: () => void;
  setErrors: (errors: IProcessingError[]) => void;
}

const ScrollableContainer = styled.div`
  height: 240px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const EDIGenerator = ({
  setOutput,
  setOutputType,
  setErrors,
}: IEDIGeneratorProps) => {
  const [cargoItems, setCargoItems] = useState<ICargoItem[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handelRemoveCargoItem = (index: number) => {
    setCargoItems(cargoItems.filter((_, i) => i !== index));
  };

  const handleAddCargoItem = (item: ICargoItem) => {
    setCargoItems([...cargoItems, item]);
    setModalIsOpen(false);
  };

  const handleGenerateEDI = async () => {
    try {
      setLoading(true);
      const res = await ediService.generateEDI(cargoItems);
      setOutput(res.edi_content);
      setOutputType();
      setErrors(res.errors || []);
    } catch (error) {
      console.error(error);
      setErrors([{ message: ErrorMessages.EDI.GENERATE_FAILED }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <GeneralSession title="Cargo Items">
      <ScrollableContainer>
        {cargoItems.map((item, index) => (
          <CargoCard
            key={index}
            item={item}
            index={index}
            onRemove={() => handelRemoveCargoItem(index)}
            removeable={true}
          />
        ))}
      </ScrollableContainer>
      <Button variant="outlined" onClick={() => setModalIsOpen(true)}>
        Add Cargo Item
      </Button>
      <Button variant="filled" onClick={handleGenerateEDI} disabled={loading}>
        {loading ? "Generating..." : "Generate EDI"}
      </Button>
      <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
        <CargoForm
          onSubmit={handleAddCargoItem}
          onCancel={() => setModalIsOpen(false)}
        />
      </Modal>
    </GeneralSession>
  );
};

export default EDIGenerator;
