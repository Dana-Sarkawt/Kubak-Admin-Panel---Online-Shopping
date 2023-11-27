<script>

    import {
        Table,
        TableBody,
        TableBodyCell,
        TableBodyRow,
        TableHead,
        TableHeadCell,
        Label, Input,
        Pagination
    } from "flowbite-svelte";
    import {ChevronLeftOutline, ChevronRightOutline} from "flowbite-svelte-icons";
</script>

<div
        class="container mx-auto h-auto px-12 flex justify-center items-center gap-3 mt-44"
>
    <div class="mb-6">
        <Label for="large-input" class="block mb-2">Search</Label>
        <Input id="large-input" placeholder="Search for Items" class="dark:bg-[#212121]"/>
    </div>

    <div class="mb-6">
        <Label for="large-input" class="block mb-2">From</Label>
        <Input id="large-input" type="date" class="dark:bg-[#212121]"/>
    </div>

    <div class="mb-6">
        <Label for="large-input" class="block mb-2">To</Label>
        <Input id="large-input" type="date" class="dark:bg-[#212121]"/>
    </div>
    <a href="#">
        <button
                class="bg-white dark:bg-[#212121] dark:text-white text-xs lg:text-lg h-12 p-3 rounded-xl text-center flex justify-center items-center  dark:hover:bg-[#f17f18] duration-300 ease-in-out"
        >Reset Date
        </button
        >
    </a>

    <a href="#">
        <img
                src="/images/search.png"
                alt=""
                class="w-12 bg-[#f17f18] p-3 rounded-xl dark:bg-[#212121] hover:bg-[#212121] dark:hover:bg-[#f17f18] duration-300 ease-in-out"
        />
    </a>

</div>

<div class="container mx-auto px-12 mt-12">
    <Table shadow>
        <TableHead class="bg-[#2D2D2D] text-white text-center dark:bg-[#212121]">
            <TableHeadCell>Image</TableHeadCell>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Time</TableHeadCell>
            <TableHeadCell>Quantity</TableHeadCell>
            <TableHeadCell>Cost</TableHeadCell>
            <TableHeadCell>Total</TableHeadCell>
        </TableHead>
        <TableBody>
            <TableBodyRow class="text-center dark:bg-[#272727]">
                <TableBodyCell class="flex justify-center">
                    <img src="/images/rice.png" alt="" class="w-14"/>
                </TableBodyCell>
                <TableBodyCell>Rice</TableBodyCell>

                <TableBodyCell>01 April, 2021 | 03:00 PM</TableBodyCell>
                <TableBodyCell>8</TableBodyCell>
                <TableBodyCell>4000IQD</TableBodyCell>
                <TableBodyCell>25000 IQD</TableBodyCell>
            </TableBodyRow>

            <TableBodyRow class="text-center dark:bg-[#272727]">
                <TableBodyCell class="flex justify-center">
                    <img src="/images/rice.png" alt="" class="w-14"/>
                </TableBodyCell>

                <TableBodyCell>Rice</TableBodyCell>
                <TableBodyCell>01 April, 2021 | 03:00 PM</TableBodyCell>
                <TableBodyCell>3</TableBodyCell>
                <TableBodyCell>4000IQD</TableBodyCell>
                <TableBodyCell>25000 IQD</TableBodyCell>
            </TableBodyRow>

            <TableBodyRow class="text-center dark:bg-[#272727]">
                <TableBodyCell class="flex justify-center">
                    <img src="/images/rice.png" alt="" class="w-14"/>
                </TableBodyCell>
                <TableBodyCell>Rice</TableBodyCell>
                <TableBodyCell>01 April, 2021 | 03:00 PM</TableBodyCell>
                <TableBodyCell>4</TableBodyCell>
                <TableBodyCell>4000IQD</TableBodyCell>
                <TableBodyCell>25000 IQD</TableBodyCell>
            </TableBodyRow>
        </TableBody>
    </Table>
</div>

  
  