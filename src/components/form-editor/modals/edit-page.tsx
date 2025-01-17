import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  ComposedModal,
  Form,
  FormGroup,
  ModalBody,
  ModalFooter,
  ModalHeader,
  TextInput,
} from "carbon-components-react";
import { Page } from "../../../api/types";
import { Edit } from "@carbon/icons-react/next";
import { SchemaContext } from "../../../context/context";
import { showToast } from "@openmrs/esm-framework";

interface EditPageModalProps {
  page: Page;
}

const EditPage: React.FC<EditPageModalProps> = ({ page }) => {
  const { t } = useTranslation();
  const { schema, setSchema } = useContext(SchemaContext);
  const [openEditPageModal, setOpenEditPageModal] = useState(false);
  const [pageName, setPageName] = useState("");

  useEffect(() => {
    setPageName(page.label);
  }, [page]);

  const handleSubmit = (event) => {
    event.preventDefault();
    let pageName = event.target.pageName.value;
    try {
      page.label = pageName == "" ? page.label : pageName;
      setSchema({ ...schema });
      showToast({
        title: t("success", "Success!"),
        kind: "success",
        critical: true,
        description: t("updatePage", "Page Updated"),
      });
      setOpenEditPageModal(false);
    } catch (error) {
      showToast({
        title: t("error", "Error"),
        kind: "error",
        critical: true,
        description: error?.message,
      });
    }
  };
  return (
    <>
      <div>
        <ComposedModal
          open={openEditPageModal}
          onClose={() => setOpenEditPageModal(false)}
        >
          <ModalHeader title={t("editPage", "Edit Page")} />
          <Form onSubmit={handleSubmit}>
            <ModalBody>
              <FormGroup legendText={""}>
                <TextInput
                  id="pageName"
                  labelText="Page Name"
                  value={pageName}
                  onChange={(event) => setPageName(event.target.value)}
                  required
                />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button type={"submit"} kind={"primary"}>
                {t("save", "Save")}
              </Button>
              <Button
                kind={"secondary"}
                onClick={() => setOpenEditPageModal(false)}
              >
                {t("close", "Close")}
              </Button>
            </ModalFooter>
          </Form>
        </ComposedModal>
      </div>
      <Button
        size="sm"
        renderIcon={Edit}
        iconDescription="Edit Page"
        hasIconOnly
        kind="ghost"
        onClick={() => {
          setOpenEditPageModal(true);
        }}
      />
    </>
  );
};

export default EditPage;
