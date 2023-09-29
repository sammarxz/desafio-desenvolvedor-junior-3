import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"


export default function Page() {
  return (
    <div className="flex flex-col gap-12">
      <form action="" className="flex flex-col gap-4">
        <Textarea placeholder="what's happening bro?" />
        <div className="flex justify-between items-center">
          <p className="text-sm text-slate-500">300 characters left</p>
          <Button>create post</Button>
        </div>
      </form>
      <Separator />
      <section className="flex flex-col gap-6">
        <h1>Latest Posts</h1>
        <Card>
          <CardContent className="pt-5">
            <p>Testing post</p>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-slate-400">
              3 days ago by 
              <span> @sammarxz</span>
            </p>
          </CardFooter>
        </Card>
        <Card>
          <CardContent className="pt-5">
            <p>Testing post</p>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-slate-400">
              3 days ago by 
              <span> @sammarxz</span>
            </p>
          </CardFooter>
        </Card>
      </section>
    </div>
  )
}