import Link from "next/link";
import { PageHeading } from "../../../components/ui";
export default function ProfilePage() {
  return (
    <section className="profile-page">
      <PageHeading
        kicker="YOUR WORKSPACE"
        title="Your profile."
        description="The person behind the questions."
      />
      <div className="profile-identity">
        <span className="avatar">TS</span>
        <div>
          <h2>Tanveer Singh</h2>
          <p>Personal research workspace</p>
        </div>
      </div>
      <dl className="profile-details">
        <div>
          <dt>Research focus</dt>
          <dd>Spacecraft fire safety</dd>
        </div>
        <div>
          <dt>Workspace</dt>
          <dd>FlameAtlas</dd>
        </div>
        <div>
          <dt>Account connection</dt>
          <dd>Not connected</dd>
        </div>
      </dl>
      <p className="field-note">
        Account editing and authentication will be available when the account
        service is connected.
      </p>
      <Link className="text-link" href="/assistant">
        Return to your research desk
      </Link>
    </section>
  );
}
