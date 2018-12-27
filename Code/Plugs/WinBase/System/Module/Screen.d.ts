interface Require {
    (ModuleName: "Screen"): Screens
}
interface Screens {
    GetScreen(CallBack: (str: string) => void): void
}