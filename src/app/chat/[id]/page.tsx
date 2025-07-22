import Chat from "@/components/Chat/Chat";
import AuthWrapper from "../../AuthWrapper";
import UpgradeButton from "@/components/UpgradeButton"; 

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props) {
  const ogImageUrl = `https://omniplex.ai/api/og?id=${params.id}`;

  return {
    title: "Omniplex",
    description: "Search online with the power of AI. Try now!",
    openGraph: {
      title: "Omniplex - Web Search AI",
      description: "Search online with the power of AI. Try now!",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: "Omniplex - Web Search AI",
        },
      ],
      url: `https://omniplex.ai/chat/${params.id}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Omniplex - Web Search AI",
      description: "Search online with the power of AI. Try now!",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: "Omniplex - Web Search AI",
        },
      ],
    },
  };
}

const ChatPage = ({ params }: Props) => {
  return (
    <AuthWrapper>
      <div className="flex flex-col h-screen">
        <div className="flex-grow overflow-y-auto">
          <Chat id={params.id} />
        </div>
        
        {/* 3. Placed the UpgradeButton in a container at the bottom */}
        <div className="p-4 bg-white border-t border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <UpgradeButton />
        </div>
      </div>
    </AuthWrapper>
  );
};

export default ChatPage;
