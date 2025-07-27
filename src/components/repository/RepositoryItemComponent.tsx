
import React from "react";
import { RepositoryItemType } from "@/types/repository";
import { GridView } from "./item/GridView";
import { ListView } from "./item/ListView";

interface RepositoryItemProps {
  item: RepositoryItemType;
  viewMode: "grid" | "list";
  onClick: (item: RepositoryItemType) => void;
  onEdit: (item: RepositoryItemType) => void;
  onRename: (item: RepositoryItemType) => void;
  onShare: (item: RepositoryItemType) => void;
  onDownload: (item: RepositoryItemType) => void;
}

export function RepositoryItemComponent({
  item,
  viewMode,
  onClick,
  onEdit,
  onRename,
  onShare,
  onDownload,
}: RepositoryItemProps) {
  if (viewMode === "grid") {
    return (
      <GridView 
        item={item}
        onClick={onClick}
        onEdit={onEdit}
        onRename={onRename}
        onShare={onShare}
        onDownload={onDownload}
      />
    );
  }
  
  return (
    <ListView 
      item={item}
      onClick={onClick}
      onEdit={onEdit}
      onRename={onRename}
      onShare={onShare}
      onDownload={onDownload}
    />
  );
}
