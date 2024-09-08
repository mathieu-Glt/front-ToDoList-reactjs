import {store} from "@/redux/config/store";
import {ReactElement, ReactNode} from "react";
import {Provider} from "react-redux";

export function Providers({ children }: { children: ReactNode }): ReactElement {
    return <Provider store={store}>{children}</Provider>;
}
