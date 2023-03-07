import styled from "styled-components";
/* import Header from "../Header"; */

const Container = styled.div`
  padding: 50px 200px;
  margin-top: 50px;

  background-color: pink;
  display: flex;
  font-size: 25px;

  flex-direction: column;
  align-items: center;
`;

const FormBox = styled.div`
  width: 600px;
  height: 100%;
`;

const Title = styled.div`
  font-size: 70px;
  font-weight: 600;
  margin-bottom: 50px;
`;

const InputBox = styled.div`
  margin-bottom: 25px;
  display: flex;
  flex-direction: column;
`;

const Label = styled.div`
  margin-bottom: 15px;
  font-weight: 550;
`;

const Input = styled.input`
  border-radius: 10px;
  height: 50px;
  border: 2px solid grey;
  opacity: 0.8;
  padding: 5px 5px;
  ::placeholder {
    align-content: center;
    padding-left: 10px;
  }
`;

const Button = styled.div`
  width: 100px;
  height: 50px;
  font-size: 18px;
  border-radius: 20px;
  background-color: aliceblue;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Create() {
  return (
    <Container>
      {/* <Header /> */}
      <FormBox>
        <Title>Create New NFT</Title>
        <InputBox>
          <Label>Image, Video, Audio or 3D Model **** </Label>
          <Input placeholder="Find Directory..." />
        </InputBox>
        <InputBox>
          <Label>Name * </Label>
          <Input placeholder="Item Name" />
        </InputBox>
        <InputBox>
          <Label>External Link</Label>
          <Input placeholder="https://yoursite.io/item/123" />
        </InputBox>
        <InputBox>
          <Label>Description</Label>
          <Input placeholder="Provide a detailed description of you item." />
        </InputBox>
        <InputBox>
          <Label>Collection</Label>
          <Input placeholder="Select Collection" />
        </InputBox>
        <InputBox>
          <Label>Blockchain</Label>
          <Input placeholder="here" />
        </InputBox>
        <Button>Create</Button>
      </FormBox>
    </Container>
  );
}

export default Create;
