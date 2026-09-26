import Link from "next/link";
import { PageFrame } from "./site/shared";

export default function NotFound() {
  return <PageFrame><main id="main-content" className="pi-wrap pi-not-found"><b>404</b><h1>هذه الصفحة غير موجودة</h1><p>قد يكون الرابط غير صحيح أو أن الصفحة نُقلت.</p><Link className="pi-button" href="/">العودة إلى الصفحة الرئيسية</Link></main></PageFrame>;
}
