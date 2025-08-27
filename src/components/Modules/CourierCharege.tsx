import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { motion } from "framer-motion";  // Import motion from framer-motion

export default function CourierCharge() {
  return (
      <div className="mx-5 space-y-4">
      <h1 className="text-4xl font-semibold">Our Courier Charges</h1>
      <p className="text-xl">Select Service Type</p>
      <div>
        <Tabs className="space-y-10" defaultValue="tab-1">
         <TabsList className="grid sm:grid-cols-4 grid-cols-2 gap-y-6 sm:space-y-0 space-x-3 justify-center">
  <TabsTrigger className="sm:text-[18px] text-md" value="tab-1">Same City Delivery</TabsTrigger>
  <TabsTrigger className="sm:text-[18px] text-md" value="tab-2">Suburb Delivery</TabsTrigger>
  <TabsTrigger className="sm:text-[18px] text-md" value="tab-3">Inner City Dhaka</TabsTrigger>
  <TabsTrigger className="sm:text-[18px] text-md" value="tab-4">Outside Dhaka</TabsTrigger>
</TabsList>

          {/* Tab 1 Content */}
          <TabsContent value="tab-1">
            <motion.div
              initial={{ opacity: 0 }}  
              animate={{ opacity: 1 }} 
              transition={{ duration: 1 }}  
            >
              <Table className="border-2">
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-2">
                    <TableHead className="border-r-2 text-xl dark:text-white text-black text-center">
                      Delivery Time
                    </TableHead>
                    <TableHead className="border-r-2 text-xl dark:text-white text-black text-center">
                      Upto 500 gm
                    </TableHead>
                    <TableHead className="border-r-2 text-xl dark:text-white text-black text-center">
                      500 gm to 1 Kilo
                    </TableHead>
                    <TableHead className="border-r-2 text-xl dark:text-white text-black text-center">
                      1 Kilo to 2 Kilo
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="border-r-2 text-2xl dark:text-white text-black text-center">
                      24 Hours
                    </TableCell>
                    <TableCell className="border-r-2 text-2xl dark:text-white text-black text-center">
                      BDT 60
                    </TableCell>
                    <TableCell className="border-r-2 text-2xl dark:text-white text-black text-center">
                      BDT 70
                    </TableCell>
                    <TableCell className="border-r-2 text-2xl dark:text-white text-black text-center">
                      BDT 90
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </motion.div>
          </TabsContent>

          {/* Tab 2 Content */}
          <TabsContent value="tab-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}  
            >
              <Table className="border-2 text-2xl">
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-2">
                    <TableHead className="border-r-2 text-xl dark:text-white text-black text-center">
                      Delivery Time
                    </TableHead>
                    <TableHead className="border-r-2 text-xl dark:text-white text-black text-center">
                      Upto 500 gm
                    </TableHead>
                    <TableHead className="border-r-2 text-xl dark:text-white text-black text-center">
                      500 gm to 1 Kilo
                    </TableHead>
                    <TableHead className="border-r-2 text-xl dark:text-white text-black text-center">
                      1 Kilo to 2 Kilo
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="border-r-2 text-2xl dark:text-white text-black text-center">
                      72 Hours
                    </TableCell>
                    <TableCell className="border-r-2 text-2xl dark:text-white text-black text-center">
                      BDT 80
                    </TableCell>
                    <TableCell className="border-r-2 text-2xl dark:text-white text-black text-center">
                      BDT 100
                    </TableCell>
                    <TableCell className="border-r-2 text-2xl dark:text-white text-black text-center">
                      BDT 130
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </motion.div>
          </TabsContent>

          {/* Tab 3 Content */}
          <TabsContent value="tab-3">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}  
            >
              <Table className="border-2 text-2xl">
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-2">
                    <TableHead className="border-r-2 text-xl dark:text-white text-black text-center">
                      Delivery Time
                    </TableHead>
                    <TableHead className="border-r-2 text-xl dark:text-white text-black text-center">
                      Upto 500 gm
                    </TableHead>
                    <TableHead className="border-r-2 text-xl dark:text-white text-black text-center">
                      500 gm to 1 Kilo
                    </TableHead>
                    <TableHead className="border-r-2 text-xl dark:text-white text-black text-center">
                      1 Kilo to 2 Kilo
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="border-r-2 text-2xl dark:text-white text-black text-center">
                      72 Hours
                    </TableCell>
                    <TableCell className="border-r-2 text-2xl dark:text-white text-black text-center">
                      BDT 110
                    </TableCell>
                    <TableCell className="border-r-2 text-2xl dark:text-white text-black text-center">
                      BDT 130
                    </TableCell>
                    <TableCell className="border-r-2 text-2xl dark:text-white text-black text-center">
                      BDT 170
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </motion.div>
          </TabsContent>

          {/* Tab 4 Content */}
          <TabsContent value="tab-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <Table className="border-2 text-2xl">
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-2">
                    <TableHead className="border-r-2 text-xl dark:text-white text-black text-center">
                      Delivery Time
                    </TableHead>
                    <TableHead className="border-r-2 text-xl dark:text-white text-black text-center">
                      Upto 500 gm
                    </TableHead>
                    <TableHead className="border-r-2 text-xl dark:text-white text-black text-center">
                      500 gm to 1 Kilo
                    </TableHead>
                    <TableHead className="border-r-2 text-xl dark:text-white text-black text-center">
                      1 Kilo to 2 Kilo
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="border-r-2 text-2xl dark:text-white text-black text-center">
                      72 Hours
                    </TableCell>
                    <TableCell className="border-r-2 text-2xl dark:text-white text-black text-center">
                      BDT 120
                    </TableCell>
                    <TableCell className="border-r-2 text-2xl dark:text-white text-black text-center">
                      BDT 145
                    </TableCell>
                    <TableCell className="border-r-2 text-2xl dark:text-white text-black text-center">
                      BDT 180
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
