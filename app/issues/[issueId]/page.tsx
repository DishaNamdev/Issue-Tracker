"use client";
import React, { use, useEffect, useState } from "react";
import {
  Flex,
  Box,
  Heading,
  TextArea,
  Button,
  TextField,
  Avatar,
  Text,
  Select,
} from "@radix-ui/themes";
import axios from "axios";
import { formatDate, decideColor, decideTextColor } from "@/app/helpers";
import { FiEdit } from "react-icons/fi";
import DeleteModal from "@/app/components/DeleteModal";
import { RiDeleteBin5Line } from "react-icons/ri";
import CustomPortal from "@/app/components/CustomPortal";
import Spinner from "@/app/components/Spinner";
import { IssueSchema } from "@/app/validationSchemas";

const IssueDescription = ({ params }: { params: { issueId: string } }) => {
  // const par = use(params);
  const [issue, setIssue] = useState<any>();
  const [deleteClicked, setDeleteClicked] = useState(false);
  const [editClicked, setEditClicked] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [updatedIssue, setUpdatedIssue] = useState<any>();

  //make the call to fetch the issue on the basis of issueId
  useEffect(() => {
    const fetchIssue = async () => {
      try {
        const response = !issue
          ? await axios.get("/api/issues/" + params.issueId)
          : { data: issue };
        if (response.data) {
          console.log("issue in>> ", response);
          setIssue(response.data);
          setUpdatedIssue(response.data);
        }
      } catch (err) {
        console.log("error occured >> ", err);
      }
    };
    fetchIssue();
  }, [params?.issueId]);

  const handleEditClick = () => {
    setEditClicked(true);
  };

  const handleDeleteClick = async () => {
    setDeleteClicked(true);
    setEditClicked(false);
  };

  const handleSaveClicked = async () => {
    setIsSaving(true);
    console.log("handleSavedClicked");
    try{
      const response = await axios.put(`/api/issues/${params?.issueId}`, updatedIssue);
      if(response.data){
        console.log("watching response", response.data);
        setIssue(response.data);
        setEditClicked(false);
        setUpdatedIssue(response.data);
      }
    }
    catch(e){
      console.log("error", e);
    }
    finally{
      setIsSaving(false);
    }
  }

  return (
    <div>
      <Flex justify="between" width="100%" height="100%" gap="6">
        <Box style={{ width: "60%", height: "100%" }}>
          {editClicked ? (
            <TextField.Root
              placeholder="Title"
              value={updatedIssue?.title}
              onChange={(e) => {
                setUpdatedIssue({ ...updatedIssue, title: e.target.value });
              }}
            ></TextField.Root>
          ) : (
            <Heading>{issue?.title}</Heading>
          )}
          <Flex className="my-4 flex items-center" justify="start" gap="4">
            <Text size="2" color="gray">
              {formatDate(issue?.createAt)}
            </Text>
            <>
              {editClicked ? (
                <Select.Root defaultValue={updatedIssue?.status} onValueChange={(value) => setUpdatedIssue({ ...updatedIssue, status: value })}>
                  <Select.Trigger />
                  <Select.Content>
                    <Select.Group>
                      <Select.Label>Status</Select.Label>
                      <Select.Item value="IN_PROGRESS">In Progress</Select.Item>
                      <Select.Item value="OPEN">Open</Select.Item>
                      <Select.Item value="CLOSE">Close</Select.Item>
                    </Select.Group>
                  </Select.Content>
                </Select.Root>
              ) : (
                <Box
                  as="div"
                  style={{
                    backgroundColor: `${decideColor(issue?.status)}`,
                    padding: "2px",
                    borderRadius: "5px",
                    fontSize: "0.8rem",
                    color: `${decideTextColor(issue?.status)}`,
                  }}
                >
                  {issue?.status}
                </Box>
              )}
            </>
          </Flex>
          {editClicked ? (
            <TextArea
              style={{ minHeight: "25rem", height: "100%", padding: "1rem" }}
              placeholder="Your Description Here..."
              value={updatedIssue?.description}
              onChange={(e) => setUpdatedIssue({ ...updatedIssue, description: e.target.value })}
            />
          ) : (
            <>
              <Text
                className="h-full"
                as="p"
                size="3"
                style={{
                  background: "var(--gray-a2)",
                  border: "1px dashed var(--gray-a7)",
                  padding: "1rem",
                  minHeight: "25rem",
                  height: "100%",
                  borderRadius: "5px",
                }}
              >
                {issue?.description}
              </Text>
              <Text
                className="flex items-center justify-end w-full mt-4"
                color="gray"
                size="1"
              >
                <Text mr="1"> Last Updated: </Text>
                {formatDate(issue?.updatedAt)}
              </Text>
            </>
          )}
          {editClicked &&
            <Flex justify="end" gap="8" className="mt-4">
              <Button
                onClick={() => {setEditClicked(false); setUpdatedIssue(issue)}}
                variant="soft"
                color="red"
              >
                Cancle
              </Button>
              <Button
                disabled={isSaving}
                onClick={handleSaveClicked}
                variant="soft"
              >
                Save Changes {isSaving && <Spinner />}
              </Button>
            </Flex>
          }
        </Box>

        <Box style={{ width: "20%", height: "100%" }}>
          <Flex direction="column" gap="4">
            <TextField.Root placeholder="Search the docs…">
              <TextField.Slot>
                <Avatar
                  fallback="A"
                  size="1"
                />
              </TextField.Slot>
            </TextField.Root>
            <Button disabled={editClicked} onClick={handleEditClick}>
              Edit Issue <FiEdit />{" "}
            </Button>
            <Button onClick={handleDeleteClick}>
              Delete Issue <RiDeleteBin5Line />
            </Button>
          </Flex>
        </Box>
      </Flex>
      {deleteClicked && (
        <CustomPortal setDeleteClicked={setDeleteClicked}>
          <DeleteModal setDeleteClicked={setDeleteClicked} />
        </CustomPortal>
      )}
    </div>
  );
};

export default IssueDescription;
