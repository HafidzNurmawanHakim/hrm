import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react'
import HomeIcons from '../../Assets/Icons/HomeIcons'

const CustomBreadcrumbs = () => {
  return (
    <Breadcrumbs color='secondary'>
    <BreadcrumbItem startContent={<HomeIcons />}>Home</BreadcrumbItem>
    <BreadcrumbItem >Dashboard</BreadcrumbItem>
     {/*<BreadcrumbItem startContent={<ArtistIcon />}>Artist</BreadcrumbItem>
    <BreadcrumbItem startContent={<AlbumIcon />}>Album</BreadcrumbItem>
    <BreadcrumbItem startContent={<SongIcon />}>Song</BreadcrumbItem> */}
  </Breadcrumbs>
  )
}

export default CustomBreadcrumbs