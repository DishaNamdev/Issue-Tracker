"use client";
import React from "react";
import { Table, Text, Card, Box } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "./Spinner";
import { IssueSchema } from "../validationSchemas";
import Link from "next/link";
import { decideColor, decideTextColor } from "../helpers";

import {
  OPEN,
  CLOSE,
  IN_PROGRESS,
  UPDATED,
  CREATED,
  RESET,
} from "../constants";
import { formatDate } from "../helpers";

const Issuelist = ({ filter }: { filter: string }) => {
  const [issues, setIssues] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  //TODO: add error handling, complete this filter logic
  useEffect(() => {
    const fetchIssues = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/issues");
        const data = response.data;
        console.log("issue >> ", response.data);
        if (response.data && filter) {
          if ([OPEN, CLOSE, IN_PROGRESS].includes(filter)) {
            const filteredIssues = data.filter((issue: IssueSchema) => {
              return issue.status === filter;
            });
            console.log("filteredIssues >> ", filteredIssues);

            setIssues(filteredIssues);
          } else if ([CREATED, UPDATED].includes(filter)) {
            const filterLogic = filter === CREATED ? "createAt" : "updatedAt";
            const res: IssueSchema[] = data.sort(
              (a: IssueSchema, b: IssueSchema) =>
                new Date(a[filterLogic] as string).getTime() -
                new Date(b[filterLogic] as string).getTime()
            );
            console.log("filteredIssues2 >> ", res);
            setIssues(res);
          } else {
            // or reset
            setIssues(response.data);
          }
        } else {
          setIssues(response.data);
        }
      } catch (err) {
        console.log("error occured >> ", err);
        setError("Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, [filter]);


  // const decideColor = (status: string) => {
  //   if (status === "OPEN") return "#90EE90";
  //   else if (status === "CLOSE") return "#ff5733";
  //   return "#33cbff";
  // };

  return (
    <>
      {loading && <Spinner />}
      {!loading && issues?.length > 0 && (
        <Table.Root
          size="2"
          className="w-full h-full mt-14 border border-gray-200 rounded-lg shadow-md"
        >
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell className="w-1/2">
                Issues
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="w-1/4">
                Status
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="w-1/4">
                Created At
              </Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {issues.map((issue: IssueSchema) => {
              return (
                <Table.Row className="cursor-pointer">
                  <Table.RowHeaderCell>
                    <Link href={`/issues/${issue.id}`}>{issue?.title}</Link>
                  </Table.RowHeaderCell>

                  <Table.Cell>
                    <Text
                      size="1"
                      style={{
                        padding: "3px",
                        backgroundColor: `${decideColor(issue.status)}`,
                        borderRadius: "0.2rem",
                        color: `${decideTextColor(issue.status)}`
                      }}
                    >
                      {issue.status}
                    </Text>
                  </Table.Cell>
                  <Table.Cell>
                    {issue.createAt ? formatDate(issue.createAt) : "N/A"}
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table.Root>
      )}
      {issues?.length === 0 && (
        <Box className="mt-16">
          <Card asChild>
            <Text as="div" size="2" weight="bold">
              No Items Available
            </Text>
          </Card>
        </Box>
      )}
    </>
  );
};

export default Issuelist;
