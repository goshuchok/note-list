import { Button, Col, Form, Modal, Row, Stack } from 'react-bootstrap';
import { Tag } from '../types';

type EditTagsModalProps = {
  availableTags: Tag[];
  show: boolean;
  handleClose: () => void;
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>;
};

export function EditTagsModal({
  availableTags,
  handleClose,
  show,
  setTags,
}: EditTagsModalProps) {
  function onDeleteTag(id: string) {
    setTags((prevTag) => {
      return prevTag.filter((tag) => tag.id !== id);
    });
  }
  function onUpdateTag(id: string, label: string) {
    setTags((prevTag) => {
      return prevTag.map((tag) => {
        if (tag.id === id) {
          return { ...tag, label };
        } else {
          return tag;
        }
      });
    });
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Tag</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Stack gap={2}>
            {availableTags.map((tag) => (
              <Row key={tag.id}>
                <Col>
                  <Form.Control
                    onChange={(e) => onUpdateTag(tag.id, e.target.value)}
                    type="text"
                    value={tag.label}
                  />
                </Col>
                <Col xs="auto">
                  <Button
                    onClick={() => onDeleteTag(tag.id)}
                    variant="outline-danger"
                  >
                    &times;
                  </Button>
                </Col>
              </Row>
            ))}
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
