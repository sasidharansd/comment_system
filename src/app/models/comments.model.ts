export interface Comment{
    id: string;
    name: string;
    content: string;
    timestamp: Date;
    parentId: string | null;
    isEdited: boolean;
}       