export default function PrivacyPage() {
  return (
    <main className='p-8 max-w-3xl mx-auto'>
      <h1 className='text-2xl font-bold mb-4'>プライバシーポリシー</h1>
      <p className='mb-4'>
        当サイト「tkrd-stack.com」では、Google
        Analyticsを使用してサイトの利用状況を分析しています。
        収集された情報は匿名で収集されており、個人を特定するものではありません。
      </p>
      <p className='mb-4'>
        Google Analyticsの詳細およびデータ収集を拒否する方法については、
        <a
          href='https://policies.google.com/technologies/partner-sites?hl=ja'
          className='text-blue-500 underline'
          target='_blank'
          rel='noopener noreferrer'
        >
          こちら（Googleポリシー）
        </a>
        をご参照ください。
      </p>
    </main>
  );
}
