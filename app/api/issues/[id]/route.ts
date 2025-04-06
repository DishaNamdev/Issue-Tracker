import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { createIssueSchema } from "@/app/validationSchemas";

// Fetch single issue
export async function GET( req: NextRequest, { params }: { params: { id: string } } ) {
  const { id } = params;
  try {
    const issue = await prisma.issue.findUnique({
      where: { id: Number(id) },
    });
    if(!issue) {
      return NextResponse.json({ error: "Issue not found" }, { status: 404 });
    }
    return NextResponse.json(issue, { status: 200 });
  } catch (error) {
    
    return NextResponse.json(
      { error: "Failed to fetch issues" },
      { status: 500 }
    );
  }
}

//EDIT ISSUE  
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const data = await req.json(); // Get the new data from the request body
  console.log("watching sent issue", data);
  const validation = createIssueSchema.safeParse(data);
      if(!validation.success){
          return NextResponse.json(validation.error.errors, {status: 400});
   }
  try {
    const existingIssue = await prisma.issue.findUnique({
      where: { id: Number(id) },
    });
    // console.log("existing issue put", existingIssue);

    if (!existingIssue) {
      return NextResponse.json({ error: "Issue not found" }, { status: 404 });
    }

    const updatedIssue = {...data, updatedAt: new Date().toISOString()};
    console.log("checking updated issue" , updatedIssue);
    const response = await prisma.issue.update({
      where: { id: Number(id) },
      data: updatedIssue,
       // Update with the received data
    });

    console.log("response", response);

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json(
      { error: "Failed to update issue" },
      { status: 500 }
    );
  }
}


// Delete one issue
export async function DELETE(req: NextRequest, { params }: { params: {id: string}}){
  const { id } = params;

  try{
    //check if the issue already exist in the DB
    const existingIssue = await prisma.issue.findUnique({
      where: { id: Number(id)},
    });
  
    if(!existingIssue){
      return NextResponse.json({error: 'Issue not found!'}, {status: 404});
    }

    const deletedIssue = await prisma.issue.delete({
      where: { id: Number(id)}
    });
    
    return NextResponse.json(deletedIssue, {status: 200});
  }
  catch(error){
    console.log("error >> ", error);
    return NextResponse.json({error: "Failed to delete the issue"}, { status: 500});
  }
}