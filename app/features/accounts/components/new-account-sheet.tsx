import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { useNewAccount } from "../hooks/use-new-account";
import { AccountForm } from "./account-form";

export const NewAccountSheet = () => {
    const { isOpen, onClose} = useNewAccount();
    return (
        <Sheet open ={isOpen} onOpenChange={onClose}> 
            <SheetContent className="space-y-4">
                <SheetHeader>
                    <SheetTitle>
                        <SheetDescription>
                            Create a new account to track your transactions.
                        </SheetDescription>
                    </SheetTitle>
                </SheetHeader>
                <AccountForm onSubmit={() => {}} disabled={false} />
            </SheetContent>
        </Sheet>
    );
};