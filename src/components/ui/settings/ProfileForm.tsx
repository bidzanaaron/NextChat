"use client";

import { uploadPicture } from "@/actions";
import { Button } from "../button";
import { Input } from "../input";
import { Label } from "../label";

export default function ProfileForm() {
  return (
    <div className="settings-page max-w-[350px]">
      <form
        action={async (formData: FormData) => {
          const result = await uploadPicture(formData);
          if (!result.success) {
            alert(result.error);
            return;
          }

          alert("Picture uploaded successfully!");
        }}
      >
        <Label htmlFor="picture">Picture</Label>
        <Input id="picture" name="file" className="mt-1" type="file" />
        <div className="submit mt-3 w-full flex justify-end">
          <Button type="submit">Save</Button>
        </div>
      </form>
    </div>
  );
}
