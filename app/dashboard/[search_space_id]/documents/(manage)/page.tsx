"use client";

import { cn } from "@/lib/utils";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    ColumnDef,
    ColumnFiltersState,
    FilterFn,
    PaginationState,
    Row,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {
    ChevronDown,
    ChevronFirst,
    ChevronLast,
    ChevronLeft,
    ChevronRight,
    ChevronUp,
    CircleAlert,
    CircleX,
    Columns3,
    Ellipsis,
    Filter,
    ListFilter,
    Plus,
    Trash,
    FileText,
    Globe,
    MessageSquare,
} from "lucide-react";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Define animation variants for reuse
const fadeInScale = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { type: "spring", stiffness: 300, damping: 30 }
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        transition: { duration: 0.15 }
    }
};

type Document = {
    id: number;
    title: string;
    document_type: "EXTENSION" | "CRAWLED_URL" | "SLACK_CONNECTOR";
    document_metadata: any;
    content: string;
    created_at: string;
    search_space_id: number;
};

// Custom filter function for multi-column searching
const multiColumnFilterFn: FilterFn<Document> = (row, columnId, filterValue) => {
    const searchableRowContent = `${row.original.title}`.toLowerCase();
    const searchTerm = (filterValue ?? "").toLowerCase();
    return searchableRowContent.includes(searchTerm);
};

const statusFilterFn: FilterFn<Document> = (row, columnId, filterValue: string[]) => {
    if (!filterValue?.length) return true;
    const status = row.getValue(columnId) as string;
    return filterValue.includes(status);
};

// Add document type icons mapping
const documentTypeIcons = {
    EXTENSION: FileText,
    CRAWLED_URL: Globe,
    SLACK_CONNECTOR: MessageSquare,
} as const;

// Add dummy data
const dummyData: Document[] = [
    {
        id: 1,
        title: "Getting Started Guide",
        document_type: "EXTENSION",
        document_metadata: { author: "John Doe", version: "1.0" },
        content: "This guide will help you get started with our platform...",
        created_at: "2024-03-15T10:00:00Z",
        search_space_id: 1,
    },
    {
        id: 2,
        title: "API Documentation",
        document_type: "CRAWLED_URL",
        document_metadata: { url: "https://api.example.com/docs" },
        content: "Complete API reference and usage examples...",
        created_at: "2024-03-14T15:30:00Z",
        search_space_id: 1,
    },
    {
        id: 3,
        title: "Team Discussion - Project Timeline",
        document_type: "SLACK_CONNECTOR",
        document_metadata: { channel: "project-updates", thread_ts: "1234567890.123456" },
        content: "Discussion about project milestones and deadlines...",
        created_at: "2024-03-13T09:15:00Z",
        search_space_id: 1,
    },
    {
        id: 4,
        title: "User Manual",
        document_type: "EXTENSION",
        document_metadata: { version: "2.1", language: "en" },
        content: "Comprehensive guide to using all features...",
        created_at: "2024-03-12T14:20:00Z",
        search_space_id: 1,
    },
    {
        id: 5,
        title: "Blog Post - New Features",
        document_type: "CRAWLED_URL",
        document_metadata: { url: "https://blog.example.com/new-features" },
        content: "Exciting new features coming to our platform...",
        created_at: "2024-03-11T11:45:00Z",
        search_space_id: 1,
    },
    {
        id: 6,
        title: "Getting Started Guide",
        document_type: "EXTENSION",
        document_metadata: { author: "John Doe", version: "1.0" },
        content: "This guide will help you get started with our platform...",
        created_at: "2024-03-15T10:00:00Z",
        search_space_id: 1,
    },
    {
        id: 7,
        title: "API Documentation",
        document_type: "CRAWLED_URL",
        document_metadata: { url: "https://api.example.com/docs" },
        content: "Complete API reference and usage examples...",
        created_at: "2024-03-14T15:30:00Z",
        search_space_id: 1,
    },
    {
        id: 8,
        title: "Team Discussion - Project Timeline",
        document_type: "SLACK_CONNECTOR",
        document_metadata: { channel: "project-updates", thread_ts: "1234567890.123456" },
        content: "Discussion about project milestones and deadlines...",
        created_at: "2024-03-13T09:15:00Z",
        search_space_id: 1,
    },
    {
        id: 9,
        title: "User Manual",
        document_type: "EXTENSION",
        document_metadata: { version: "2.1", language: "en" },
        content: "Comprehensive guide to using all features...",
        created_at: "2024-03-12T14:20:00Z",
        search_space_id: 1,
    },
    {
        id: 10,
        title: "Blog Post - New Features",
        document_type: "CRAWLED_URL",
        document_metadata: { url: "https://blog.example.com/new-features" },
        content: "Exciting new features coming to our platform...",
        created_at: "2024-03-11T11:45:00Z",
        search_space_id: 1,
    },
    {
        id: 11,
        title: "Getting Started Guide",
        document_type: "EXTENSION",
        document_metadata: { author: "John Doe", version: "1.0" },
        content: "This guide will help you get started with our platform...",
        created_at: "2024-03-15T10:00:00Z",
        search_space_id: 1,
    },
    {
        id: 12,
        title: "API Documentation",
        document_type: "CRAWLED_URL",
        document_metadata: { url: "https://api.example.com/docs" },
        content: "Complete API reference and usage examples...",
        created_at: "2024-03-14T15:30:00Z",
        search_space_id: 1,
    },
    {
        id: 13,
        title: "Team Discussion - Project Timeline",
        document_type: "SLACK_CONNECTOR",
        document_metadata: { channel: "project-updates", thread_ts: "1234567890.123456" },
        content: "Discussion about project milestones and deadlines...",
        created_at: "2024-03-13T09:15:00Z",
        search_space_id: 1,
    },
    {
        id: 14,
        title: "User Manual",
        document_type: "EXTENSION",
        document_metadata: { version: "2.1", language: "en" },
        content: "Comprehensive guide to using all features...",
        created_at: "2024-03-12T14:20:00Z",
        search_space_id: 1,
    },
    {
        id: 15,
        title: "Blog Post - New Features",
        document_type: "CRAWLED_URL",
        document_metadata: { url: "https://blog.example.com/new-features" },
        content: "Exciting new features coming to our platform...",
        created_at: "2024-03-11T11:45:00Z",
        search_space_id: 1,
    },
];

const columns: ColumnDef<Document>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        size: 28,
        enableSorting: false,
        enableHiding: false,
    },
    {
        header: "Title",
        accessorKey: "title",
        cell: ({ row }) => {
            const Icon = documentTypeIcons[row.original.document_type];
            return (
                <motion.div
                    className="flex items-center gap-2 font-medium"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    style={{ display: 'flex' }}
                >
                    <Icon size={16} className="text-muted-foreground shrink-0" />
                    <span>{row.getValue("title")}</span>
                </motion.div>
            );
        },
        size: 250,
    },
    {
        header: "Type",
        accessorKey: "document_type",
        cell: ({ row }) => {
            const type = row.getValue("document_type") as keyof typeof documentTypeIcons;
            const Icon = documentTypeIcons[type];
            return (
                <Badge variant="outline" className="flex items-center gap-1.5">
                    <Icon size={14} />
                    {type.split('_').map(word => word.charAt(0) + word.slice(1).toLowerCase()).join(' ')}
                </Badge>
            );
        },
        size: 160,
    },
    {
        header: "Content Preview",
        accessorKey: "content",
        cell: ({ row }) => {
            const content = row.getValue("content") as string;
            return (
                <div className="max-w-[300px] truncate text-sm text-muted-foreground">
                    {content}
                </div>
            );
        },
        size: 300,
    },
    {
        header: "Created At",
        accessorKey: "created_at",
        cell: ({ row }) => {
            const date = new Date(row.getValue("created_at"));
            return date.toLocaleDateString();
        },
        size: 120,
    },
    {
        id: "actions",
        header: () => <span className="sr-only">Actions</span>,
        cell: ({ row }) => <RowActions row={row} />,
        size: 60,
        enableHiding: false,
    },
];

export default function DocumentsTable() {
    const id = useId();
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const inputRef = useRef<HTMLInputElement>(null);

    const [sorting, setSorting] = useState<SortingState>([
        {
            id: "title",
            desc: false,
        },
    ]);

    const [data, setData] = useState<Document[]>([]);
    useEffect(() => {
        setData(dummyData);
    }, []);

    const handleDeleteRows = () => {
        const selectedRows = table.getSelectedRowModel().rows;
        const updatedData = data.filter(
            (item) => !selectedRows.some((row) => row.original.id === item.id),
        );
        setData(updatedData);
        table.resetRowSelection();
    };

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        enableSortingRemoval: false,
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        getFilteredRowModel: getFilteredRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        state: {
            sorting,
            pagination,
            columnFilters,
            columnVisibility,
        },
    });

    // Get unique status values
    const uniqueStatusValues = useMemo(() => {
        const statusColumn = table.getColumn("document_type");

        if (!statusColumn) return [];

        const values = Array.from(statusColumn.getFacetedUniqueValues().keys());

        return values.sort();
    }, [table.getColumn("document_type")?.getFacetedUniqueValues()]);

    // Get counts for each status
    const statusCounts = useMemo(() => {
        const statusColumn = table.getColumn("document_type");
        if (!statusColumn) return new Map();
        return statusColumn.getFacetedUniqueValues();
    }, [table.getColumn("document_type")?.getFacetedUniqueValues()]);

    const selectedStatuses = useMemo(() => {
        const filterValue = table.getColumn("document_type")?.getFilterValue() as string[];
        return filterValue ?? [];
    }, [table.getColumn("document_type")?.getFilterValue()]);

    const handleStatusChange = (checked: boolean, value: string) => {
        const filterValue = table.getColumn("document_type")?.getFilterValue() as string[];
        const newFilterValue = filterValue ? [...filterValue] : [];

        if (checked) {
            newFilterValue.push(value);
        } else {
            const index = newFilterValue.indexOf(value);
            if (index > -1) {
                newFilterValue.splice(index, 1);
            }
        }

        table.getColumn("document_type")?.setFilterValue(newFilterValue.length ? newFilterValue : undefined);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                staggerChildren: 0.1
            }}
            className="mx-auto max-w-[1200px] space-y-4 p-4"
        >
            {/* Filters */}
            <motion.div
                className="flex flex-wrap items-center justify-between gap-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    delay: 0.1
                }}
            >
                <div className="flex items-center gap-3">
                    {/* Filter by name or email */}
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                        <Input
                            id={`${id}-input`}
                            ref={inputRef}
                            className={cn(
                                "peer min-w-60 ps-9",
                                Boolean(table.getColumn("title")?.getFilterValue()) && "pe-9",
                            )}
                            value={(table.getColumn("title")?.getFilterValue() ?? "") as string}
                            onChange={(e) => table.getColumn("title")?.setFilterValue(e.target.value)}
                            placeholder="Filter by title..."
                            type="text"
                            aria-label="Filter by title"
                        />
                        <motion.div
                            className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.1 }}
                        >
                            <ListFilter size={16} strokeWidth={2} aria-hidden="true" />
                        </motion.div>
                        {Boolean(table.getColumn("title")?.getFilterValue()) && (
                            <motion.button
                                className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                                aria-label="Clear filter"
                                onClick={() => {
                                    table.getColumn("title")?.setFilterValue("");
                                    if (inputRef.current) {
                                        inputRef.current.focus();
                                    }
                                }}
                                initial={{ opacity: 0, rotate: -90 }}
                                animate={{ opacity: 1, rotate: 0 }}
                                exit={{ opacity: 0, rotate: 90 }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <CircleX size={16} strokeWidth={2} aria-hidden="true" />
                            </motion.button>
                        )}
                    </motion.div>
                    {/* Filter by status */}
                    <Popover>
                        <PopoverTrigger asChild>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            >
                                <Button variant="outline">
                                    <Filter
                                        className="-ms-1 me-2 opacity-60"
                                        size={16}
                                        strokeWidth={2}
                                        aria-hidden="true"
                                    />
                                    Type
                                    {selectedStatuses.length > 0 && (
                                        <motion.span
                                            initial={{ scale: 0.8 }}
                                            animate={{ scale: 1 }}
                                            className="-me-1 ms-3 inline-flex h-5 max-h-full items-center rounded border border-border bg-background px-1 font-[inherit] text-[0.625rem] font-medium text-muted-foreground/70"
                                        >
                                            {selectedStatuses.length}
                                        </motion.span>
                                    )}
                                </Button>
                            </motion.div>
                        </PopoverTrigger>
                        <PopoverContent className="min-w-36 p-3" align="start">
                            <motion.div
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                variants={fadeInScale}
                            >
                                <div className="space-y-3">
                                    <div className="text-xs font-medium text-muted-foreground">Filters</div>
                                    <div className="space-y-3">
                                        <AnimatePresence>
                                            {uniqueStatusValues.map((value, i) => (
                                                <motion.div
                                                    key={value}
                                                    className="flex items-center gap-2"
                                                    initial={{ opacity: 0, y: -5 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 5 }}
                                                    transition={{ delay: i * 0.05 }}
                                                >
                                                    <Checkbox
                                                        id={`${id}-${i}`}
                                                        checked={selectedStatuses.includes(value)}
                                                        onCheckedChange={(checked: boolean) => handleStatusChange(checked, value)}
                                                    />
                                                    <Label
                                                        htmlFor={`${id}-${i}`}
                                                        className="flex grow justify-between gap-2 font-normal"
                                                    >
                                                        {value}{" "}
                                                        <span className="ms-2 text-xs text-muted-foreground">
                                                            {statusCounts.get(value)}
                                                        </span>
                                                    </Label>
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </motion.div>
                        </PopoverContent>
                    </Popover>
                    {/* Toggle columns visibility */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            >
                                <Button variant="outline">
                                    <Columns3
                                        className="-ms-1 me-2 opacity-60"
                                        size={16}
                                        strokeWidth={2}
                                        aria-hidden="true"
                                    />
                                    View
                                </Button>
                            </motion.div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <motion.div
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                variants={fadeInScale}
                            >
                                <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
                                {table
                                    .getAllColumns()
                                    .filter((column) => column.getCanHide())
                                    .map((column) => {
                                        return (
                                            <DropdownMenuCheckboxItem
                                                key={column.id}
                                                className="capitalize"
                                                checked={column.getIsVisible()}
                                                onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                                onSelect={(event) => event.preventDefault()}
                                            >
                                                {column.id}
                                            </DropdownMenuCheckboxItem>
                                        );
                                    })}
                            </motion.div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="flex items-center gap-3">
                    {/* Delete button */}
                    {table.getSelectedRowModel().rows.length > 0 && (
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button className="ml-auto" variant="outline">
                                    <Trash
                                        className="-ms-1 me-2 opacity-60"
                                        size={16}
                                        strokeWidth={2}
                                        aria-hidden="true"
                                    />
                                    Delete
                                    <span className="-me-1 ms-3 inline-flex h-5 max-h-full items-center rounded border border-border bg-background px-1 font-[inherit] text-[0.625rem] font-medium text-muted-foreground/70">
                                        {table.getSelectedRowModel().rows.length}
                                    </span>
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
                                    <div
                                        className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border"
                                        aria-hidden="true"
                                    >
                                        <CircleAlert className="opacity-80" size={16} strokeWidth={2} />
                                    </div>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete{" "}
                                            {table.getSelectedRowModel().rows.length} selected{" "}
                                            {table.getSelectedRowModel().rows.length === 1 ? "row" : "rows"}.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                </div>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleDeleteRows}>Delete</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    )}
                    {/* Add user button */}
                    <Button className="ml-auto" variant="outline">
                        <Plus className="-ms-1 me-2 opacity-60" size={16} strokeWidth={2} aria-hidden="true" />
                        Add document
                    </Button>
                </div>
            </motion.div>

            {/* Table */}
            <motion.div
                className="rounded-md border"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    delay: 0.2
                }}
            >
                <Table className="table-fixed">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="hover:bg-transparent">
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            style={{ width: `${header.getSize()}px` }}
                                            className="h-11"
                                        >
                                            {header.isPlaceholder ? null : header.column.getCanSort() ? (
                                                <div
                                                    className={cn(
                                                        header.column.getCanSort() &&
                                                        "flex h-full cursor-pointer select-none items-center justify-between gap-2",
                                                    )}
                                                    onClick={header.column.getToggleSortingHandler()}
                                                    onKeyDown={(e) => {
                                                        // Enhanced keyboard handling for sorting
                                                        if (
                                                            header.column.getCanSort() &&
                                                            (e.key === "Enter" || e.key === " ")
                                                        ) {
                                                            e.preventDefault();
                                                            header.column.getToggleSortingHandler()?.(e);
                                                        }
                                                    }}
                                                    tabIndex={header.column.getCanSort() ? 0 : undefined}
                                                >
                                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                                    {{
                                                        asc: (
                                                            <ChevronUp
                                                                className="shrink-0 opacity-60"
                                                                size={16}
                                                                strokeWidth={2}
                                                                aria-hidden="true"
                                                            />
                                                        ),
                                                        desc: (
                                                            <ChevronDown
                                                                className="shrink-0 opacity-60"
                                                                size={16}
                                                                strokeWidth={2}
                                                                aria-hidden="true"
                                                            />
                                                        ),
                                                    }[header.column.getIsSorted() as string] ?? null}
                                                </div>
                                            ) : (
                                                flexRender(header.column.columnDef.header, header.getContext())
                                            )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        <AnimatePresence mode="popLayout">
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row, index) => (
                                    <motion.tr
                                        key={row.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                            transition: {
                                                type: "spring",
                                                stiffness: 300,
                                                damping: 30,
                                                delay: index * 0.03
                                            }
                                        }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className={cn(
                                            "border-b transition-colors hover:bg-muted/50",
                                            row.getIsSelected() ? "bg-muted/50" : ""
                                        )}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id} className="last:py-0">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </motion.tr>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        No documents found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </AnimatePresence>
                    </TableBody>
                </Table>
            </motion.div>

            {/* Pagination */}
            <div className="flex items-center justify-between gap-8">
                {/* Results per page */}
                <motion.div
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                    <Label htmlFor={id} className="max-sm:sr-only">
                        Rows per page
                    </Label>
                    <Select
                        value={table.getState().pagination.pageSize.toString()}
                        onValueChange={(value) => {
                            table.setPageSize(Number(value));
                        }}
                    >
                        <SelectTrigger id={id} className="w-fit whitespace-nowrap">
                            <SelectValue placeholder="Select number of results" />
                        </SelectTrigger>
                        <SelectContent className="[&_*[role=option]>span]:end-2 [&_*[role=option]>span]:start-auto [&_*[role=option]]:pe-8 [&_*[role=option]]:ps-2">
                            {[5, 10, 25, 50].map((pageSize, index) => (
                                <motion.div
                                    key={pageSize}
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        transition: { delay: index * 0.05 }
                                    }}
                                >
                                    <SelectItem value={pageSize.toString()}>
                                        {pageSize}
                                    </SelectItem>
                                </motion.div>
                            ))}
                        </SelectContent>
                    </Select>
                </motion.div>
                {/* Page number information */}
                <motion.div
                    className="flex grow justify-end whitespace-nowrap text-sm text-muted-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <p className="whitespace-nowrap text-sm text-muted-foreground" aria-live="polite">
                        <span className="text-foreground">
                            {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}-
                            {Math.min(
                                Math.max(
                                    table.getState().pagination.pageIndex * table.getState().pagination.pageSize +
                                    table.getState().pagination.pageSize,
                                    0,
                                ),
                                table.getRowCount(),
                            )}
                        </span>{" "}
                        of <span className="text-foreground">{table.getRowCount().toString()}</span>
                    </p>
                </motion.div>

                {/* Pagination buttons */}
                <div>
                    <Pagination>
                        <PaginationContent>
                            {/* First page button */}
                            <PaginationItem>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                >
                                    <Button
                                        size="icon"
                                        variant="outline"
                                        className="disabled:pointer-events-none disabled:opacity-50"
                                        onClick={() => table.firstPage()}
                                        disabled={!table.getCanPreviousPage()}
                                        aria-label="Go to first page"
                                    >
                                        <ChevronFirst size={16} strokeWidth={2} aria-hidden="true" />
                                    </Button>
                                </motion.div>
                            </PaginationItem>
                            {/* Previous page button */}
                            <PaginationItem>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                >
                                    <Button
                                        size="icon"
                                        variant="outline"
                                        className="disabled:pointer-events-none disabled:opacity-50"
                                        onClick={() => table.previousPage()}
                                        disabled={!table.getCanPreviousPage()}
                                        aria-label="Go to previous page"
                                    >
                                        <ChevronLeft size={16} strokeWidth={2} aria-hidden="true" />
                                    </Button>
                                </motion.div>
                            </PaginationItem>
                            {/* Next page button */}
                            <PaginationItem>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                >
                                    <Button
                                        size="icon"
                                        variant="outline"
                                        className="disabled:pointer-events-none disabled:opacity-50"
                                        onClick={() => table.nextPage()}
                                        disabled={!table.getCanNextPage()}
                                        aria-label="Go to next page"
                                    >
                                        <ChevronRight size={16} strokeWidth={2} aria-hidden="true" />
                                    </Button>
                                </motion.div>
                            </PaginationItem>
                            {/* Last page button */}
                            <PaginationItem>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                >
                                    <Button
                                        size="icon"
                                        variant="outline"
                                        className="disabled:pointer-events-none disabled:opacity-50"
                                        onClick={() => table.lastPage()}
                                        disabled={!table.getCanNextPage()}
                                        aria-label="Go to last page"
                                    >
                                        <ChevronLast size={16} strokeWidth={2} aria-hidden="true" />
                                    </Button>
                                </motion.div>
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </motion.div>
    );
}

function RowActions({ row }: { row: Row<Document> }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <motion.div
                    className="flex justify-end"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Button size="icon" variant="ghost" className="shadow-none">
                        <Ellipsis size={16} strokeWidth={2} />
                    </Button>
                </motion.div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem>
                    <span>View Details</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive focus:text-destructive">
                    <span>Delete</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export { DocumentsTable }