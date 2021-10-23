import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import styles from "./Pagination.module.scss";
import Link from "next/link";

export default function Pagination() {
  return (
    <nav className={styles.container}>
      <Link href="#">
        <a>
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </a>
      </Link>
      <Link href="#">
        <a>1</a>
      </Link>

      <Link href="#">
        <a>2</a>
      </Link>

      <Link href="#">
        <a>3</a>
      </Link>

      <Link href="#">
        <a>4</a>
      </Link>

      <Link href="#">
        <a>5</a>
      </Link>

      <Link href="#">
        <a>
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </a>
      </Link>
    </nav>
  );
}
