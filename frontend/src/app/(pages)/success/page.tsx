import { Suspense } from 'react';
import SubscriptionSuccess from './components/successcomponent';

export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SubscriptionSuccess />
    </Suspense>
  );
}
