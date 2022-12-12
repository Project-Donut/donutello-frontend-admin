export const trimStatus = (status) => {
    return status.slice(6);
}
export const statusOptions = ['100 - pending', '200 - processing', '300 - shipped', '400 - delivered', '000 - cancelled'];