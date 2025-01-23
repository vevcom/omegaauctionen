"use client"
import React, { FormEvent } from "react"
import "./style.css"
import { prisma } from "../prisma"
import "../components/approve-button/approve-button"
import ApproveButton from "../components/approve-button/approve-button"
import DeleteButton from "../components/delete-button/delete-button"


export default function testPage() {
    const ID = 22

    return (
        <div id="mainDiv">
        <ApproveButton objectId={ID}>
        </ApproveButton>
        <DeleteButton objectId={ID}></DeleteButton>
        </div >
    )
}